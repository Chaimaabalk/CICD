var mysql = require('mysql');
var connection = mysql.createConnection({
    user: 'root',
    password: 'Testpwd',
    database: 'ynov_ci'
});
connection.connect(function(err) {
    if (err) throw err;
    console.log('You are now connected...');
});
connection.query('SELECT * FROM utilisateur', function(error, results, fields) {
    if (error) throw error;
    console.log('Nb users: ', results.length);
});
connection.end();