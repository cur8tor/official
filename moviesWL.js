const movieTable = $('#movieTable tbody');
let top500Movies = [];
let userMovies = new Set();
let userRatedMovies = [];

async function displayMovies(movies) {
    movieTable.empty();
    for (const movie of movies) {
        if (movie.Const) {
            let userRating = getUserRating(movie.Const);
            let streamingText = '';
            let watched = userMovies.has(movie.Const) ? 'checked' : '';
            let watchedCheckbox = `<input type="checkbox" class="watched-checkbox" data-const="${movie.Const}" ${watched}>`;
            if (movie.Link && movie.Link !== 'link not found') {
                streamingText = `<a href="${movie.Link}" target="_blank">${movie.Streaming}</a>`;
            } else if (movie.Streaming) {
                streamingText = movie.Streaming === 'n/a' ? 'Buy' : movie.Streaming;
            }
            // let position = movie.Position ? movie.Position : '-';
            // let imdbRating = movie['IMDb Rating'] ? movie['IMDb Rating'] : '-';
            // let row = `<tr><td>${position}</td><td>${watchedCheckbox}</td><td>${movie.Title}</td><td>${imdbRating}</td><td>${streamingText}</td><td>${movie.Year}</td><td>${movie.Genres}</td><td>${movie.Directors}</td><td>${userRating}</td></tr>`;
            let row = `<tr><td>${movie.Position}</td><td>${watchedCheckbox}</td><td>${movie.Title}</td><td>${movie['IMDb Rating']}</td><td>${streamingText}</td><td>${movie.Year}</td><td>${movie.Genres}</td><td>${movie.Directors}</td><td contenteditable="true" class="user-rating" data-const="${movie.Const}">${userRating}</td></tr>`;
            movieTable.append(row);
        }
    }
}

function getUserRating(movieConst) {
    let movie = userRatedMovies.find(userMovie => userMovie.Const === movieConst);
    if (movie) {
        return movie['Your Rating'];
    } else if (userMovies.has(movieConst)) {
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

async function filterAndSortMovies() {
    let filter = $('#filter').val().toLowerCase();
    let sort = $('#sort').val();
    let search = $('#search').val().toLowerCase();
    let search2 = $('#search2').val().toLowerCase();
    let showWatched = $('#showWatched').prop('checked');
    let hideBeforeYear = parseInt($('#hideBeforeYear').val()) || 0;
    let tableOption = $('#tableOption').val();
    let genresToExclude = [];
    
    if (filter !== '') {
        genresToExclude = filter.split(',').map(genre => genre.trim().toLowerCase());
    }

    let sourceMovies = top500Movies;
    if ($('#tableOption').val() === 'allMovies') {
        await displayMovies(sourceMovies);
        return;
    }
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
        if (movie.Streaming === undefined || movie.Streaming === null || movie.Streaming === 'n/a') {
            movie.Streaming = 'Buy or Rent';
        }
        if (!showWatched && userMovies.has(movie.Const)) {
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
        if (search !== '' && !movie.Title.toLowerCase().includes(search)) {
            continue;
        }
        if (search2 !== '' && !movie.Title.toLowerCase().includes(search2)) {
            continue;
        }
        
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
    
    console.log("load 5");
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
}

// Add this JavaScript function to toggle the filters sidebar on mobile
function toggleFiltersSidebar() {
    const sidebar = document.querySelector(".sidebar");
    const mainContent = document.querySelector(".main");
    const FilterButtonR = document.querySelector("#FiltersBtn");
    const SearchBoxR = document.querySelector(".searchBox");
    if (sidebar.style.display === "block") {
        sidebar.style.display = "none";
        FilterButtonR.textContent = "Filters"
        mainContent.style.display = "block"; // Show the main content when hiding the sidebar
    } else {
        sidebar.style.display = "block";
        FilterButtonR.textContent = "Save"
        SearchBoxR.style.display = "none"
        mainContent.style.display = "none"; // Hide the main content when showing the sidebar
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

$(document).ready(function () {
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
    $('#movieTable').on('input', '.user-rating', function () {
        let movieConst = $(this).data('const');
        let newRating = parseInt($(this).text().trim());
    
        if ($(this).text().trim() === '') {
            userRatedMovies = userRatedMovies.filter(movie => movie.Const !== movieConst);
        } else if (!isNaN(newRating) && newRating >= 1 && newRating <= 10) {
            let movie = userRatedMovies.find(movie => movie.Const === movieConst);
    
            if (movie) {
                movie['Your Rating'] = newRating;
            } else {
                let movieToAdd = top500Movies.find(movie => movie.Const === movieConst);
                if (movieToAdd) {
                    userRatedMovies.push({ Const: movieToAdd.Const, 'Your Rating': newRating });
                }
            }
        } else {
            $(this).text(getUserRating(movieConst));
        }
        saveUserMovies();
    });
    $('#movieTable').on('change', '.watched-checkbox', function () {
        let movieConst = $(this).data('const');
        let isChecked = $(this).prop('checked');
    
        if (isChecked) {
            userMovies.add(movieConst);
        } else {
            userMovies.delete(movieConst);
        }
    
        saveUserMovies();
        filterAndSortMovies();
    });    
    $('#showAllMovies').on('click', function () {
        // Uncheck all streaming services checkboxes
        $('#streamingServices input:checked').prop('checked', false);
        
        // Clear input fields
        $('#filter').val('');
        $('#hideBeforeYear').val('');
        
        // Set table option to "top500" and sort by IMDb rating
        $('#tableOption').val('top500');
        $('#sort').val('rating');
        $('#showWatched').prop('checked', true);
        
        // Save filters and refresh the table
        saveFilters();
        filterAndSortMovies();
    });
});