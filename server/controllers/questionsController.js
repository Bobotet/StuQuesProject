const {Question, Answer} = require('../models');
const fs = require('fs')
const path = require('path')
const imageUploadPath = path.resolve(__dirname, '..', 'files', 'images');
const {Op} = require('sequelize')


class QuestionsController {

    async getQues(req, res) {
        try {
            const idQ = req.params.id
            const quset = await Question.findOne(
                {
                    where: {
                        id: idQ
                    },
                }
            )

            res.send(quset)
        } catch (e) {
            console.log(e)
            return res.status(500).json({message: "User info get error"})
        }
    }

    async add(req, res) {
        try {
            const quest = await Question.create(req.body)
            let len
            {
                req.files != null ?
                    len = req.files.file.length
                    :
                    len = 0
            }
            // Заносим картиночки
            await fs.promises.mkdir(imageUploadPath + '\\' + quest.id, {recursive: true})
            const names = []
            if (len == undefined) {
                const file = req.files.file
                names.push(file.name)
                let filepath = imageUploadPath + '\\' + quest.id + '\\' + file.name
                if (fs.existsSync(filepath)) {
                    return res.status(400).json({message: "Already exist"})
                }
                await file.mv(filepath)
            } else if (len > 0) {
                for (let i = 0; i < req.files.file.length; i++) {
                    const file = req.files.file[i]
                    names.push(file.name)
                    let filepath = imageUploadPath + '\\' + quest.id + '\\' + file.name
                    if (fs.existsSync(filepath)) {
                        return res.status(400).json({message: "Already exist"})
                    }
                    await file.mv(filepath)
                }
            }
            ////////
            quest.files = names
            await quest.save()
            res.send("uploaded successfully")
        } catch (e) {
            console.log(e)
            return res.status(500).json({message: "Upload error"})
        }
    }

    async list(req, res) {
        console.log(req.query)
        let titS = req.query.titleSearch;
        let subS = req.query.sub;
        const limit = +req.query.limit;
        const page = +req.query.page;
        if (titS === "" || titS == undefined) {
            if (subS === "Все" || subS == undefined) {
                const questions = await Question.findAll();
                const resposeQuestions = questions.slice((+page - 1) * +limit, ((+page - 1) * +limit) + +limit);
                res.setHeader('Access-Control-Expose-Headers', 'x-total-count')
                res.setHeader('x-total-count', questions.length);
                res.send(resposeQuestions).json
            } else {
                const questions = await Question.findAll({
                    where: {
                        subject: subS
                    }
                })
                const resposeQuestions = questions.slice((+page - 1) * +limit, ((+page - 1) * +limit) + +limit);
                res.setHeader('Access-Control-Expose-Headers', 'x-total-count')
                res.setHeader('x-total-count', questions.length);
                res.send(resposeQuestions).json
            }
        } else {
            if (subS === "Все" || subS == undefined) {
                const questions = await Question.findAll({
                    where: {
                        [Op.or]: [
                            {
                                title: {
                                    [Op.substring]: titS
                                }
                            }, {
                                description: {
                                    [Op.substring]: titS
                                }
                            }]
                        }
                    })
                    const resposeQuestions = questions.slice((+page - 1) * +limit, ((+page - 1) * +limit) + +limit);
                    res.setHeader('Access-Control-Expose-Headers', 'x-total-count')
                    res.setHeader('x-total-count', questions.length);
                    res.send(resposeQuestions).json
            } else {
                const questions = await Question.findAll({
                    where: {
                        [Op.and]: [
                            {
                                [Op.or]: [
                                    {
                                        title: {
                                            [Op.substring]: titS
                                        }
                                    }, {
                                        description: {
                                            [Op.substring]: titS
                                        }
                                    }]
                            }, {
                                subject: subS
                            }
                        ]
                    }
                })
                const resposeQuestions = questions.slice((+page - 1) * +limit, ((+page - 1) * +limit) + +limit);
                res.setHeader('Access-Control-Expose-Headers', 'x-total-count')
                res.setHeader('x-total-count', questions.length);
                res.send(resposeQuestions).json
            }
        }
    }

    async addAnswer(req, res) {
        try {
            const answer = await Answer.create(req.body)
            let len
            {
                req.files != null ?
                    len = req.files.file.length
                    :
                    len = 0
            }
            // Заносим картиночки
            await fs.promises.mkdir(imageUploadPath + '\\answers\\' + answer.id, {recursive: true})
            const names = []
            if (len == undefined) {
                const file = req.files.file
                names.push(file.name)
                let filepath = imageUploadPath + '\\answers\\' + answer.id + '\\' + file.name
                if (fs.existsSync(filepath)) {
                    return res.status(400).json({message: "Already exist"})
                }
                await file.mv(filepath)
            } else if (len > 0) {
                for (let i = 0; i < req.files.file.length; i++) {
                    const file = req.files.file[i]
                    names.push(file.name)
                    let filepath = imageUploadPath + '\\answers\\' + answer.id + '\\' + file.name
                    if (fs.existsSync(filepath)) {
                        return res.status(400).json({message: "Already exist"})
                    }
                    await file.mv(filepath)
                }
            }
            answer.files = names
            await answer.save()
            res.send("uploaded successfully")
        } catch (e) {
            console.log(e)
            return res.status(500).json({message: "Add answer error"})
        }

    }

    async getMy(req, res) {
        let userId = req.query.id
        console.log(userId)
        res.send(await Question.findAll(
            {
                where: {
                    userId: userId
                }
            }
        )).json
    }

    async deleteQues(req,res){
        try {
            console.log(req.body)


            const ques = await Question.findOne({
                where:{
                    id:req.body.id
                }
            })
            await ques.destroy()
            res.send("Вопрос успешно удален")
        } catch (e) {
            console.log(e)
            return res.status(500).json({message: "Delete question error"})
        }
    }

    async getAnswers(req,res){
        try {
            const answers = await Answer.findAll({
                where:{
                    questionId:req.body.id
                }
            })
            res.send(answers)
        } catch (e) {
            console.log(e)
            return res.status(500).json({message: "Send answers error"})
        }
    }

    async deleteAnswers(req,res){
        try {
            const answer = await Answer.findOne({
                where:{
                    id:req.body.id
                }
            })
            await answer.destroy()
            res.send("Deleted successfully")
        } catch (e) {
            console.log(e)
            return res.status(500).json({message: "Send answers error"})
        }
    }
}

module.exports = new QuestionsController()