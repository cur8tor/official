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
        let row = `<tr><td>${movie.Position}</td><td>${watchedCheckbox}</td><td>${movie.Title}</td><td>${movie['IMDb Rating']}</td><td>${streamingText}</td><td>${movie.Year}</td><td>${movie.Genres}</td><td>${movie.Directors}</td><td>${userRating}</td></tr>`;
        movieTable.append(row);
      }
    }
}

function getUserRating(movieConst) {
    let movie = userRatedMovies.find(userMovie => userMovie.Const === movieConst);
    return movie ? movie['Your Rating'] : '-';
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
    let showWatched = $('#showWatched').prop('checked');
    let hideBeforeYear = parseInt($('#hideBeforeYear').val()) || 0;
    let tableOption = $('#tableOption').val();
    let genresToExclude = [];
    
    if (filter !== '') {
        genresToExclude = filter.split(',').map(genre => genre.trim().toLowerCase());
    }

    let sourceMovies = top500Movies;
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
        if (streamingServices.length > 0 && !streamingServices.includes(movie.Streaming) && movie.Streaming) {
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
        
        let userRating = getUserRating(movie.Const);
        filteredMovies.push({...movie, userRating, streaming});
    }

    if (sort === 'rating') {
        filteredMovies.sort((a, b) => b['IMDb Rating'] - a['IMDb Rating']);
    } else if (sort === 'year') {
        filteredMovies.sort((a, b) => b.Year - a.Year);
    } else if (sort === 'userRating') { 
        filteredMovies.sort((a, b) => b.userRating - a.userRating);
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
                userMovies.add(movie.Const);
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
}

function loadUserMovies() {
    const storedUserMovies = localStorage.getItem('userMovies');
    if (storedUserMovies) {
        userMovies = new Set(JSON.parse(storedUserMovies));
    }
}

$(document).ready(function () {
    loadUserMovies();
    loadCSV('imdb_data_csv_Bigo.csv', (movies) => {
        top500Movies = movies.filter(row => row.Const);
        filterAndSortMovies(); 
    });
    $('#filter').on('input', filterAndSortMovies);
    $('#sort').on('change', filterAndSortMovies);
    $('#uploadBtn').on('click', () => $('#fileUpload').click());
    $('#fileUpload').on('change', handleFileUpload);
    $('#showWatched').on('change', function () {
        filterAndSortMovies();
    });
    $('#hideBeforeYear').on('input', filterAndSortMovies);
    $('#displayTop5').on('change', filterAndSortMovies);
    $('#tableOption').on('change', filterAndSortMovies);
    $('#streamingServices').on('change', filterAndSortMovies);
    $('#search').on('input', filterAndSortMovies);
    $('#movieTable').on('change', '.watched-checkbox', function() {
        let movieConst = $(this).data('const');
        if ($(this).prop('checked')) {
            userMovies.add(movieConst);
        } else {
            userMovies.delete(movieConst);
        }
        saveUserMovies();
        filterAndSortMovies();
    });    
});