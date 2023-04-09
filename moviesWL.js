const movieTable = $('#movieTable tbody');
let top500Movies = [];
let userMovies = new Set();
let userTVShows = new Set();
let userRatedMovies = [];

async function displayMovies(movies) {
    movieTable.empty();
    for (const movie of movies) {
        if (movie.Const) {
            let userRating = getUserRating(movie.Const);
            let streamingText = '';
            let watched = (userMovies.has(movie.Const) || userTVShows.has(movie.Const)) ? 'checked' : '';
            let watchedCheckbox = `<input type="checkbox" class="watched-checkbox" data-const="${movie.Const}" ${watched}>`;
            const formatRuntime = (runtime) => `${Math.floor(runtime / 60)}h ${runtime % 60}m`;
            let runtimeHM = formatRuntime(movie['Runtime (mins)']);
            if (movie.Link && movie.Link !== 'link not found') {
                streamingText = `<a href="${movie.Link}" target="_blank">${movie.Streaming}</a>`;
            } else if (movie.Streaming) {
                streamingText = movie.Streaming === 'n/a' ? 'Buy' : movie.Streaming;
            }
            //let row = `<tr><td>${movie['IMDb Rating']}</td><td>${movie.Title}</td><td>${movie.Year}</td><td>${streamingText}</td><td>${movie.Genres}</td><td>${runtimeHM}</td><td>${watchedCheckbox}</td><td contenteditable="true" class="user-rating" data-const="${movie.Const}">${userRating}</td></tr>`;
            let row = `<tr><td>${movie['IMDb Rating']}</td><td>${movie.Title}</td><td>${movie.Year}</td><td>${streamingText}</td><td>${movie.Genres}</td><td>${runtimeHM}</td><td>${watchedCheckbox}</td></tr>`;
            movieTable.append(row);
        }
    }
}

function getUserRating(movieConst, source) {
    let movie = userRatedMovies.find(userMovie => userMovie.Const === movieConst);
    if (movie) {
        return movie['Your Rating'];
    } else if ((source === 'top500' && userMovies.has(movieConst)) || (source === 'topTV' && userTVShows.has(movieConst))) {
        return '';
    } else {
        return '';
    }
}

function loadCSV(url, callback) {
    Papa.parse(url, {
        download: true,
        header: true,
        complete: (results) => {
            callback(results.data);
        },
    });
}

async function filterAndSortMovies(moviesSource = top500Movies) {
    let filter = $('#filter').val().toLowerCase();
    let sort = $('#sort').val();
    // let search = $('#search').val().toLowerCase();
    // let search2 = $('#search2').val().toLowerCase();
    let showWatched = $('#showWatched').prop('checked');
    let hideBeforeYear = parseInt($('#hideBeforeYear').val()) || 0;
    let tableOption = $('#tableOption').val();
    let genresToExclude = [];
    
    if (filter !== '') {
        genresToExclude = filter.split(',').map(genre => genre.trim().toLowerCase());
    }

    let sourceMovies = tableOption === 'topTV' ? topTVShows : moviesSource; // Change this line to use your top TV shows variable

    let filteredMovies = [];
    let streamingServices = [];

    $('#streamingServices input:checked').each(function() {
        streamingServices.push($(this).val());
    });

    for (const movie of sourceMovies) {
        let movieGenres = movie.Genres ? movie.Genres.toLowerCase().split(', ') : [];
        let streaming = movie.Streaming;
        if (tableOption === 'userRatings' && !userMovies.has(movie.Const)) {
            continue;
        }
        if (!showWatched && (userMovies.has(movie.Const) || (tableOption === 'topTV' && userTVShows.has(movie.Const)))) {
            continue;
        }
        if (hideBeforeYear && parseInt(movie.Year) < hideBeforeYear) {
            continue;
        }
        if (streamingServices.length > 0 && !streamingServices.includes(movie.Streaming) && movie.Streaming && !(movie.Streaming === 'Not found' && streamingServices.includes('Buy or Rent'))) {
            continue;
        }  
        if (genresToExclude.length > 0) {
            let found = false;
            for (const genre of genresToExclude) {
              if (movieGenres.includes(genre)) {
                found = true;
                break;
              }
            }
            if (found) {
              continue;
            }
        }
        // if (search !== '' && !movie.Title.toLowerCase().includes(search)) {
        //     continue;
        // }
        // if (search2 !== '' && !movie.Title.toLowerCase().includes(search2)) {
        //     continue;
        // }
        
        let userRating = getUserRating(movie.Const);
        filteredMovies.push({...movie, userRating, streaming});
    }

    if (sort === 'rating') {
        filteredMovies.sort((a, b) => b['IMDb Rating'] - a['IMDb Rating']);
    } else if (sort === 'year') {
        filteredMovies.sort((a, b) => b.Year - a.Year);
    } else if (sort === 'userRating') {
        filteredMovies.sort((a, b) => {
            if (b.userRating === '-' && a.userRating === '-') return 0;
            if (a.userRating === '-') return 1;
            if (b.userRating === '-') return -1;
            return b.userRating - a.userRating;
        });
    }
    await displayMovies(filteredMovies);
}

function userRatingsUpload() {
    let file = document.getElementById('userRatingsFile').files[0];
    if (!file) {
        alert('Please select a CSV file');
        return;
    }
    Papa.parse(file, {
        header: true,
        dynamicTyping: true,
        complete: function (results) {
            userMovies.clear();
            userRatedMovies = results.data.filter(row => row.Const);
            userRatedMovies.forEach(movie => {
                if (movie.Const) {
                    userMovies.add(movie.Const);
                }
            });
            $('#showWatched').prop('checked', true);
            saveUserMovies();
            filterAndSortMovies();
        }
    });
}

function handleFileUpload(event) {
    let file = event.target.files[0];
    if (file) {
        Papa.parse(file, {
            header: true,
            complete: (results) => {
                userMovies.clear();
                userRatedMovies = results.data.filter(row => row.Const); 
                userRatedMovies.forEach(movie => {
                    userMovies.add(movie.Const);
                });
                saveUserMovies();
                filterAndSortMovies();
            }
        });
    }
}

function saveUserMovies() {
    localStorage.setItem('userMovies', JSON.stringify(Array.from(userMovies)));
    localStorage.setItem('userRatedMovies', JSON.stringify(userRatedMovies));
    localStorage.setItem('userTVShows', JSON.stringify(Array.from(userTVShows))); // Save seen TV shows
}

function loadUserMovies() {
    const storedUserMovies = localStorage.getItem('userMovies');
    const storedUserRatedMovies = localStorage.getItem('userRatedMovies');
    if (storedUserMovies) {
        userMovies = new Set(JSON.parse(storedUserMovies));
    }
    if (storedUserRatedMovies) {
        userRatedMovies = JSON.parse(storedUserRatedMovies);
    }
    const storedUserTVShows = localStorage.getItem('userTVShows');
    if (storedUserTVShows) {
        userTVShows = new Set(JSON.parse(storedUserTVShows));
    }
}

function toggleFiltersSidebar() {
    const sidebar = document.querySelector(".sidebar");
    const mainContent = document.querySelector(".main");
    const filterButton = document.querySelector("#FiltersBtn");
  
    // check if the screen is small
    if (window.matchMedia("(max-width: 1001px)").matches) {
      if (sidebar.style.display === "block") {
        sidebar.style.display = "none";
        filterButton.textContent = "Filters";
        mainContent.style.display = "block";
        mainContent.style.marginLeft = "0rem";
        console.log("show main");
      } else {
        sidebar.style.display = "block";
        filterButton.textContent = "Save";
        mainContent.style.marginLeft = "20rem";
        mainContent.style.display = "none";
        console.log("hide main");
      }
    } else { // screen is large
      if (sidebar.style.display === "block") {
        // hide sidebar 
        sidebar.style.display = "none";
        mainContent.style.marginLeft = "0rem";
        filterButton.textContent = "Show Filters";
        //sidebar.style.float = "left";
        //mainContent.style.width = "calc(100% - " + sidebar.offsetWidth + "px)";
      } else {
        // show sidebar 
        sidebar.style.display = "block";
        mainContent.style.marginLeft = "20rem";
        filterButton.textContent = "Hide Filters";
        //sidebar.style.float = "none";
        //mainContent.style.width = "100%";
      }
    }
}
  

function saveFilters() {
    const filterState = {
        sort: $('#sort').val(),
        filter: $('#filter').val(),
        showWatched: $('#showWatched').prop('checked'),
        hideBeforeYear: $('#hideBeforeYear').val(),
        tableOption: $('#tableOption').val(),
    };
    const checkedStreamingServices = [];
    $('input[id^="streaming"]:checked').each(function () {
        checkedStreamingServices.push($(this).val());
    });
    localStorage.setItem('filters', JSON.stringify(filterState));
    localStorage.setItem('checkedStreamingServices', JSON.stringify(checkedStreamingServices));
}

function loadFilters() {
    const storedFilters = localStorage.getItem('filters');
    if (storedFilters) {
        const filterState = JSON.parse(storedFilters);
        $('#sort').val(filterState.sort);
        $('#filter').val(filterState.filter);
        $('#showWatched').prop('checked', filterState.showWatched);
        $('#hideBeforeYear').val(filterState.hideBeforeYear);
        $('#tableOption').val(filterState.tableOption);
    }
}

function loadCheckedStreamingServices() {
    const storedCheckedStreamingServices = localStorage.getItem('checkedStreamingServices');
    if (storedCheckedStreamingServices) {
        const savedServices = JSON.parse(storedCheckedStreamingServices);
        savedServices.forEach(service => {
            $(`input[id^="streaming"][value="${service}"]`).prop('checked', true);
        });
    }
}

let topTVShows = [];
function loadTopTV() {
    loadCSV('top_TV_post.csv', (shows) => {
        topTVShows = shows.filter(show => show.Const);
    });
}

$(document).ready(function () {
    loadTopTV();
    loadCSV('imdb_data_csv_Bigo.csv', (movies) => {
        top500Movies = movies.filter(row => row.Const);
        loadUserMovies();
        loadFilters();
        loadCheckedStreamingServices();
        filterAndSortMovies(); 
    });
    $('#filter').on('input', () => { saveFilters(); filterAndSortMovies(); });
    $('#sort').on('change', () => { saveFilters(); filterAndSortMovies(); });
    $('#uploadBtn').on('click', () => $('#fileUpload').click());
    $('#FiltersBtn').on('click', toggleFiltersSidebar);
    $('#fileUpload').on('change', handleFileUpload);
    $('#showWatched').on('change', function () { saveFilters(); filterAndSortMovies(); });
    $('#hideBeforeYear').on('input', () => { saveFilters(); filterAndSortMovies(); });
    $('#tableOption').on('change', () => { saveFilters(); filterAndSortMovies(); });
    $('#streamingServices').on('change', filterAndSortMovies);
    $('#search').on('input', filterAndSortMovies);
    $('#search2').on('input', filterAndSortMovies);

    // Add these event listeners to apply the filters and sorting to the topTV table as well.
    $('#filter').on('input', () => { saveFilters(); filterAndSortMovies(); });
    $('#sort').on('change', () => { saveFilters(); filterAndSortMovies(); });
    $('#showWatched').on('change', function () { saveFilters(); filterAndSortMovies(); });
    $('#hideBeforeYear').on('input', () => { saveFilters(); filterAndSortMovies(); });
    $('#tableOption').on('change', () => { saveFilters(); filterAndSortMovies(); });
    $('#streamingServices').on('change', filterAndSortMovies);
    $('#search').on('input', filterAndSortMovies);
    $('#search2').on('input', filterAndSortMovies);
    $('#movieTable').on('change', '.watched-checkbox', async function () {
        let movieConst = $(this).data('const');
        let isTopTV = ($('#tableOption').val() === 'topTV');
        if ($(this).is(':checked')) {
            if (isTopTV) {
                userTVShows.add(movieConst);
            } else {
                userMovies.add(movieConst);
            }
        } else {
            userMovies.delete(movieConst);
            userTVShows.delete(movieConst);
        }
        saveUserMovies();
        if (isTopTV) {
            filterAndSortMovies(topTVShows);
        } else {
            filterAndSortMovies();
        }
    });
    $('#showAllMovies').on('click', function () {
        $('#streamingServices input:checked').prop('checked', false);
        $('#filter').val('');
        $('#hideBeforeYear').val('');
        $('#tableOption').val('top500');
        $('#sort').val('rating');
        $('#showWatched').prop('checked', true);
        saveFilters();
        filterAndSortMovies();
    });
});