const member = require('./member');

exports.getMembers = function() {
    return new Promise( (resolve, reject) => {
        member.find({}, function(err,data)
        {
            if(err)
            {
                reject(err);
            }
            else
            {
                resolve(data);
            }
        })
    })
}
exports.getMember = function(id)
{
    return new Promise((resolve,reject) =>
    {
        member.findById(id, function(err,data)
        {
            if(err)
            {
                reject(err);
            }
            else
            {
                resolve(data);
            }
        })
    })
}


exports.addMember = function(newMember)
{
    return new Promise((resolve,reject) =>
    {
        let m = new member({
            name : newMember.name,
            email : newMember.email,
            city : newMember.city,
        });
        m.save(function(err)
        {
            if(err)
            {
                reject(err);
            }
            else
            {
                resolve(m);
            }
        })
    })
}

exports.editMember = function(id,newData)
{
    return new Promise((resolve,reject) =>
    {
        member.findByIdAndUpdate(id,
            {
                name : newData.name,
                email : newData.year,
                city : newData.city,

            }, function(err)
            {
                if(err)
                {
                    reject(err)
                }
                else
                {
                    resolve(newData)
                }
            })

    })

}


exports.deleteMember = function(id)
{
    return new Promise((resolve,reject) =>
    {
        member.findByIdAndDelete(id,function(err)
        {
            if(err)
            {
                reject(err)
            }
            else
            {
                resolve('Member Deleted !')
            }
        })
    })
}
exports.movieToUser = function(member_id, movie_id) {
    return member.findByIdAndUpdate(
        member_id,
        { $push: { movies: movie_id } },
        { new: true, useFindAndModify: false }
    );
};
