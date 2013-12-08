mysql = require('mysql');

var pool = mysql.createPool({
    host:'54.200.108.16',
    port:3306,
    user:'root',
    password:'root',
    database:'classhelper'
});

exports.test = function(req, res){
	pool.getConnection(function(err,connection){
		//use the connection
		connection.query('select * from test' , function(err,rows){
			connection.release();
			res.charset = "utf-8";
			res.json(rows);
		});
	});
};

exports.checkid = function(req, res){
	pool.getConnection(function(err, connection){
		connection.query('select (user_id) from member where user_id=?',[req.query.user_id], function(err, rows){
			connection.release();
			if(rows.length == 1){
				res.send(200,'true');
			}else{
				res.send(200,'false');
			}
		});
	});
};

exports.join = function(req, res){
	pool.getConnection(function(err, connection) {
		connection.query( 'insert into member(user_id,pwd) values(?,?)',[req.query.user_id, req.query.pwd], function(err, rows) {
			connection.release();
			if(rows == undefined){
				res.send(200,'false');
			}else{
				res.send(200,'true');
			}
		});
	});
};

exports.login = function(req, res){
	pool.getConnection(function(err, connection){
		connection.query('select * from member where user_id = ? and pwd = ?',[req.query.user_id,req.query.pwd], function(err,rows){
			if(rows.length == 1){
				connection.release();
				res.send(200,'true');
			}else{
				connection.release();
				res.send(200,'false');
			}
		});
	});
};

exports.visit = function(req, res){
	pool.getConnection(function(err, connection){
		connection.query('insert into visit_history (user_id,place,visit_date,visit_time) values (?,?,curdate(),curtime())',[req.query.user_id, req.query.place], function(err,rows){
			connection.release();
			res.send(200,'true');
		});
	});
};

exports.showhistory = function(req,res){
	pool.getConnection(function(err,connection){
		connection.query('select place,visit_date,visit_time from visit_history where user_id = ?',[req.query.user_id],function(err,rows){
			connection.release();
			if(rows.length == 0){
				res.send(200,'false');
			}else{
				res.charset='utf-8';
				res.json(rows);
			}
		});
	});
};

exports.isvisit = function(req,res){
	pool.getConnection(function(err,connection){
		connection.query('select * from visit_history where user_id = ? and place =?',[req.query.user_id,req.query.place],function(err,rows){
			connection.release();
			if(rows.length == 0){
				res.send(200,'false');
			}else{
				res.send(200,'true');
			}
		});
	});
};
