const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
const app= express();

const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true
});

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.post('/add', function(req, res){
  
 pool.query("Insert into Student (name,weight,height,haircolor,gpa) values ('"+req.body.name+"',"+req.body.weight+ ","+ req.body.height+
 ",'"+ req.body.hair+ "',"+ req.body.gpa+" )", function(error,results){
  res.redirect('back');
 });
 //res.json could be used too
 
})

app.post('/update',function(req,res){

  if(isNaN(req.body.update)){
    pool.query("update student set "+req.body.infoList+"='"+ req.body.update+"' where id="+ req.body.idList, function(error,results){
      res.redirect('back');
    });
  }else{
    pool.query("update student set "+req.body.infoList+"="+ req.body.update+" where id="+ req.body.idList, function(error,results){
      res.redirect('back');
    });
  }

  

})

app.post('/delete',function(req,res){

  pool.query("delete from student where id="+req.body.deleteList, function(error,results){
    res.redirect('back');
  });

})

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
//app.get('/', (req, res) => res.render('pages/index'))

app.get('/', function (req, res){

  pool.query("select * from student", function(error,result){
    var results = { 'results': (result.rows[0].id) ? result.rows : [] };
    res.render('pages/DatabaseManager',results);
  })
  
})

app.listen(PORT, () => console.log(`Listening on ${ PORT }`))


  