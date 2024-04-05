import db from "../configdb/db.js";
import bcrtpt from 'bcrypt'

//register
export function register(req, res) {
    const { firstname, lastname, email, password } = req.body

    const encrypt = bcrtpt.hashSync(password, 10)
    try {
        db.query('INSERT INTO register (firstname,lastname,email,password) VALUES (?,?,?,?)', [firstname, lastname, email, encrypt], (err, result) => {
            if (err) throw err
            res.status(200).json(result)
        })
    } catch (error) {
        res.status(404).json("Regsiter Error")
    }
}


//login 

export function Login(req, res) {
    const sql = 'select * from register where email = ?'

    db.query(sql, [req.body.email], (err, data) => {
        if (err) return res.json("login error")
        if (data.length > 0) {

            bcrtpt.compare(req.body.password, data[0].password, (err, response) => {
                if (err) {
                    return res.json("Compare error")
                }

                if (response) {
                    return res.json("Login Successfully")
                } else {
                    return res.json("Password not match")

                }
            })
        } else {
            return res.json("email not existed")
        }
    })
}

//get user
export function getuser(req, res) {
    try {
        db.query('select * from register', (err, result) => {
            if (err) throw err
            res.json(result)
        })
    } catch (error) {
        res.status(404).json("Feching error")
    }
}


//forgote password 

export function forgotepass(req, res) {

    const sql = 'select * from register where email = ?'

    db.query(sql, [req.body.email], (err, data) => {

        if (err) throw err

        if (data.length > 0) {
            bcrtpt.compare(req.body.password, data[0].password, (err, res) => {

                if (res) {
                    db.query('update register set password = ? ', [req.body.password], (err, response) => {
                        if (err) throw err;
                        res.status(200).json(response)
                    })
                }
            })
        }
        return res.json("email not found")
    })

}

