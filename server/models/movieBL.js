const movie = require('./movie');

exports.getAllMovies = function () {
    return new Promise((resolve, reject) => {
        movie.find({}, function (err, data) {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        })
    })
}
exports.getMovieById = function (id) {
    return new Promise((resolve, reject) => {
        movie.findById(id, function (err, data) {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        })
    })
}


exports.addMovie = function (newMovie) {
    return new Promise((resolve, reject) => {
        let m = new movie({
            name: newMovie.name,
            image: newMovie.image,
            genres: newMovie.genres,
            premiered: newMovie.premiered
        });

        m.save(function (err) {
            if (err) {
                reject(err);
            } else {
                resolve(m);
            }
        })
    })
}

exports.updateMovieById = function (id, newData) {
    return new Promise((resolve, reject) => {
        movie.findByIdAndUpdate(id,
            {
                name: newData.name,
                year: newData.year,
                image: newData.image,
                genres: newData.genres

            }, function (err) {
                if (err) {
                    reject(err)
                } else {
                    resolve(newData)
                }
            })

    })

}


exports.deleteMovieById = function (id) {
    return new Promise((resolve, reject) => {
        movie.findByIdAndDelete(id, function (err) {
            if (err) {
                reject(err)
            } else {
                resolve('Movie Deleted !')
            }
        })
    })
}
exports.memberToMovie = function (movie_id, member_id) {
    return movie.findByIdAndUpdate(
        movie_id,
        {$push: {subscriptions: member_id}},
        {new: true, useFindAndModify: false}
    );
};
