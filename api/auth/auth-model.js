const db = require('../../data/dbConfig');


function find(){
    //select username, id from users;
    return db('users').select('id', 'username', 'password')
}

function findBy(filter){
    //select username, id from users where username = username;
    return db('users').where(filter).first()
}

function findById(id){
    //select username, id from users where id = 1;
    return db('users')
    .where('id', id)
    .first()
}

async function add(newUser){
    //insert into users (username, password) values ('testing2', '1234');
    const [id] = await db('users').insert(newUser)
    return db('users').where({id}).first()
}



module.exports = {
    find,
    findBy,
    findById,
    add,
}
