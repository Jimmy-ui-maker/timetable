const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());
const port = 3001;

const db = mysql.createConnection({
    host: 'localhost',
    user: "root",
    password: '',
    database: "timetable"
})
//Function to add course 
app.post('/admin/addCourse', (req, res) => {
    const course_code = req.body.course_code;
    const course_title = req.body.course_title;
  
    // Check if the email already exists in the database
    db.query(`SELECT course_code, course_title FROM courses WHERE course_code = ? OR course_title=?`, [course_code, course_title], (err, result) => {
      if (err) {
        console.error('MySQL Error:', err);
        res.status(500).json({ message: ' error' });
      } else {
        if (result.length > 0) {
          // An existing record with the same email was found
          res.status(409).json({ message: 'Email exists' });
        } else {
          // Email doesn't exist, proceed with registration
          const values = [
            req.body.course_title,
            req.body.course_code,
            req.body.level,
            req.body.semester,
            req.body.credit_unit,
            req.body.course_status,
            req.body.lecture_time,
          ];
          
          const daysValues = req.body.days.map(day => day.name).join(', '); // Join days into a single string
          
          db.query(
            `INSERT INTO courses(course_title, course_code, level, semester, credit_unit, course_status,lecture_times, days) 
             VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            [...values, daysValues], // Pass days as a single value
            (err, data) => {
              if (err) {
                console.error('MySQL Error:', err);
                res.status(500).json({ message: 'Failed' });
              } else {
                res.status(200).json({ message: 'success' });
              }
            }
          );
          
        }
      }
    });
  });


  //Registration function
app.post('/registration', (req, res) => {
    const email = req.body.email;
    const regNo = req.body.matric_no;
  
    // Check if the email already exists in the database
    db.query(`SELECT email, matric_no FROM student WHERE email = ? OR matric_no=?`, [email,regNo], (err, result) => {
      if (err) {
        console.error('MySQL Error:', err);
        res.status(500).json({ message: 'email error' });
      } else {
        if (result.length > 0) {
          // An existing record with the same email was found
          res.status(409).json({ message: 'Email exists' });
        } else {
          // Email doesn't exist, proceed with registration
          const values = [
            req.body.name,
            req.body.matric_no,
            req.body.gender,
            req.body.level,
            req.body.department,
            req.body.email,
            req.body.password,
          ];
          db.query(
            `INSERT INTO student(name, matric_no, gender, level, department, email, password) 
             VALUES(?, ?, ?, ?, ?, ?, ?)`,
            values,
            (err, data) => {
              if (err) {
                console.error('MySQL Error:', err);
                res.status(500).json({ message: 'Failed to register' });
              } else {
                res.status(200).json({ message: 'success' });
              }
            }
          );
        }
      }
    });
  });

  app.post('/user/changePassword', (req, res) => {
    const { userOldPassword, oldPass, student_id, newPass, confirmPass } = req.body;

    // Check if the old password matches the current password
    if (userOldPassword === oldPass) {
        // Check if the new password and confirmation match
        if (newPass === confirmPass) {
            // Update the password in the database
            const updateSql = "UPDATE student SET password = ? WHERE student_id = ?";
            db.query(updateSql, [newPass, student_id], (error, updateResult) => {
                if (error) {
                    console.error('MySQL Error:', error);
                    return res.status(500).json({ message: 'Failed to change password. Please try again later.' });
                } else {
                    return res.status(200).json({ message: 'Password changed successfully.' });
                }
            });
        } else {
            // New password and confirmation do not match
            return res.status(409).json({ message: 'New password and confirmation do not match.' });
        }
    } else {
        // Incorrect old password
        return res.status(500).json({ message: 'Incorrect old password.' });
    }
});

  
  

  //Add evaluation
  app.post('/evaluation', (req, res) => {
          const values = [
            req.body.course_id,
            req.body.user_id,
            req.body.c_content,
            req.body.knowledge,
            req.body.material,
            req.body.c_interaction,
            req.body.comment_a,
            req.body.comment_b,
            req.body.comment_c,
            req.body.comment_d,
          ];
  
          db.query(
            `INSERT INTO evaluation(course_id, user_id, c_content, knowledge, material, c_interaction, comment_a, comment_b, comment_c, comment_d) 
             VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            values,
            (err, data) => {
              if (err) {
                console.error('MySQL Error:', err);
                res.status(500).json({ message: 'Failed to register' });
              } else {
                db.query(`UPDATE course SET status='set' WHERE course_id='${req.body.course_id}' `, (error, result)=>{
                  if(!error){
                    res.status(200).json({ message: 'success' });
                  }else{
                    res.status(500).json({ message: 'Failed to register' });
                  }
                })
                
              }
            }
          );
      
  });
  
  app.post('/admin/AddEvaluation', (req, res) => {
    const values = [
      'set',
      req.body.comment_a,
      req.body.comment_b,
      req.body.comment_c,
      req.body.comment_d,
      req.body.course_id,
    ];

    db.query(
      `UPDATE course SET status=?, c_comment_a=?, c_comment_b=?, c_comment_c=?, c_comment_d=? WHERE course_id=?`,
      values,
      (err, data) => {
        if (err) {
          console.error('MySQL Error:', err);
          res.status(500).json({ message: 'Failed to register' });
        } else {
          res.status(200).json({ message: 'success' });
          
        }
      }
    );

});


  app.get('/manageCourse', (req,res)=>{
    const sql = "SELECT * FROM courses ORDER BY course_id DESC";
    db.query(sql, (err, result)=>{
        if(err){
            console.err("Error Fetching record", err);
        }else{
            res.json(result);
        }
    })
})

app.get('/user/ourCourses/:id', (req, res) => {
  const id = req.params.id;
  const sql = 'SELECT * FROM courses WHERE level = ? ORDER BY course_id DESC';
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error("Error Fetching record", err);
      res.status(500).json({ error: "Error fetching record" });
    } else {
      res.json(result);
    }
  });
});


app.get('/admin/manageStudent', (req,res)=>{
  const sql = "SELECT * FROM student ORDER BY student_id DESC";
  db.query(sql, (err, result)=>{
      if(err){
          console.err("Error Fetching record", err);
      }else{
          res.json(result);
      }
  })
})

app.get('/admin/evRecord', (req,res)=>{
  const sql = "SELECT * FROM evaluation INNER JOIN course ON evaluation.course_id=course.course_id LEFT JOIN student ON student.student_id=evaluation.user_id ORDER BY evaluation.evaluation_id DESC";
  db.query(sql, (err, result)=>{
      if(err){
          console.err("Error Fetching record", err);
      }else{
          res.json(result);
      }
  })
})

app.get('/admin/viewFeedback/:id', (req,res)=>{
  const sql = `SELECT * FROM evaluation INNER JOIN course ON evaluation.course_id=course.course_id INNER JOIN student ON student.student_id=evaluation.user_id WHERE evaluation.evaluation_id=${req.params.id} `;
  db.query(sql, (err, result)=>{
      if(err){
          console.err("Error Fetching record", err);
      }else{
          res.json(result);
      }
  })
})

app.get('/admin/fetchEvaluation:id', (req,res)=>{
  const sql = `SELECT * FROM course WHERE course_id='${req.params.id}' `;
  db.query(sql, (err, result)=>{
      if(err){
          console.err("Error Fetching record", err);
      }else{
          res.json(result);
      }
  })
})


app.get('/manage', (req,res)=>{
    const sql = "SELECT * FROM student ORDER BY student_id DESC";
    db.query(sql, (err, result)=>{
        if(err){
            console.err("Error Fetching record", err);
        }else{
            res.json(result);
        }
    })
})

app.get('/fetchCourse', (req,res)=>{
  const sql = "SELECT * FROM course ORDER BY course_id DESC";
  db.query(sql, (err, result)=>{
      if(err){
          console.err("Error Fetching record", err);
      }else{
          res.json(result);
      }
  })
})
app.get('/myEvaluation/:id', (req,res)=>{
  const sql = `SELECT * FROM evaluation INNER JOIN course ON evaluation.course_id=course.course_id WHERE evaluation.user_id='${req.params.id}' ORDER BY evaluation.evaluation_id DESC `;
  db.query(sql, (err, result)=>{
      if(err){
          console.err("Error Fetching record", err);
      }else{
          res.json(result);
          console.log(result);
      }
  })
})


app.delete("/manage/:id", (req, res)=>{
    const recordID  = req.params.id;
    
    const query = db.query("DELETE FROM student WHERE student_id=?",[recordID], (err, result)=>{
        if(err){
            console.error('Error deleting record:', err);
            res.status(500).json({ error: 'Error record' });
          } else {
            res.json({ message: 'deleted success' });
          }
    })
})

app.get("/Evaluation/:id", (req, res)=>{
  const recordID  = req.params.id;
  
  const query = db.query(
    'SELECT * FROM course WHERE course_id = ?',
    [recordID],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
      } else {
        if (result.length > 0) {
          res.json(result);
          // console.log(result)
        } else {
          res.status(404).json({ message: 'Record not found' });
        }
      }
    }
  );
});

app.delete("/admin/manage/:id", (req, res)=>{
  const recordID  = req.params.id;
  
  const query = db.query("DELETE FROM course WHERE course_id=?",[recordID], (err, result)=>{
      if(err){
          console.error('Error deleting record:', err);
          res.status(500).json({ error: 'Error record' });
        } else {
          res.json({ message: 'deleted success' });
        }
  })
})

app.put("/manage/:delete", (req, res)=>{
    const recordId = req.params.delete;
    
    db.query("UPDATE student SET status='active' WHERE student_id=?", [recordId], (err, result)=>{
        if(err){
            res.status(500).json({error: 'Error updating record'});
        }else{
            res.json({message: 'Record updates successfully'});
        }
    })
})


app.post('/student/Login', async(req, res) => {

    try{
        db.query(`SELECT * FROM student WHERE matric_no LIKE '${req.body.matric_no}' AND password='${req.body.password}'`, 
        (err, row)=>{
            if(!err){
                if(row.length >0){
                    res.json({message: 'success', result: row});
                }else{
                    res.json({message: 'invalid login'});
                }
            }else{
                console.log(err);
            }
        })

        }catch(e){
            console.log(e);
            res.sendStatus(500);
        }
    })

   
    app.post('/admin/login', async(req, res) => {

        try{
            db.query(`SELECT * FROM admin WHERE email LIKE '${req.body.email}' AND password='${req.body.password}'`, 
            (err, row)=>{
                if(!err){
                    if(row.length >0){
                        res.json({message: 'success', result: row});
                    }else{
                        res.json({message: 'invalid login'});
                    }
                }else{
                    console.log(err);
                }
            })
    
            }catch(e){
                console.log(e);
                res.sendStatus(500);
            }
        })

//COUNT RECORDS STUDENT RECORDS
app.get('/admin/Dashboard/student', (req, res) => {
  const query = 'SELECT COUNT(*) AS count FROM student'; // Replace your_table_name with the name of your table

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error querying MySQL:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      const count = results[0].count;
      res.json({ count });
    }
  });
});

//COUNT EVALUATION RECORDS
app.get('/admin/Dashboard/student', (req, res) => {
  const query = 'SELECT COUNT(*) AS count FROM student'; // Replace your_table_name with the name of your table

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error querying MySQL:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      const count = results[0].count;
      res.json({ count });
    }
  });
});

//Count total Course 
app.get('/admin/Dashboard/course', (req, res) => {
  const query = 'SELECT COUNT(*) AS count FROM courses'; // Replace your_table_name with the name of your table

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error querying MySQL:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      const count = results[0].count;
      res.json({ count });
    }
  });
});

app.get("/", (req, res)=>{
    res.send("Welcome message from get method in express");
})

app.listen(port, ()=>{
    console.log(`Server is Listening ${port}`);
})