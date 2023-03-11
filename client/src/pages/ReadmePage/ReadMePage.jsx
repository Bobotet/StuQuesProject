import React from 'react';
import styles from './ReadMePage.module.css'
import MenuBar from "../../components/menuBar/MenuBar";
import SideBar from "../../components/sideBar/SideBar";
import Footer from "../../components/footer/Footer";

const ReadMePage = () => {
    return (
        <div className={styles.wrapper}>
            <MenuBar/>
            <main className={styles.main}>
                <SideBar/>
                <div className={styles.questions}>
                    <p className={styles.header} style={{display: "inline-block", marginRight: "10px"}}>Помощь</p>

                    <p className={styles.text1}>1. Как зарегистрироваться?</p>
                    <p className={styles.text2}>Для регистрации нажмите кнопку "Вход" или, если уже в аккаунте,
                        наведитесь на стрелку рядом с ником в правом верхнем углу и нажмите на неё, в выпавшем списке
                        нажмите кнопку "Выход". После нажмите кнопку "Вход". После на странице выбирите ссылку
                        "Зарегистрироваться" и введите данные, которые запрашиваются в поле ввода. После регистрации вам
                        будет на почту отправлено письмо с ссылкой для активации аккаунта. Перейдите по ней. После вы
                        уже будете авторизированы и сможете пользоваться сервисом StuQues.</p>

                    <p className={styles.text1}>2. Как просмотреть вопрос?</p>
                    <p className={styles.text2}>Для просмотра вопроса перейдите во вкладку "Вопросы" и выбирете
                        интересующий из всех представленных или задайте критерии поиска с помощью "поиска" или
                        выпадающего меню. Чтобы открыть страницу вопроса, нужно нажать на текст вопроса.</p>

                    <p className={styles.text1}>3. Как задать вопрос?</p>
                    <p className={styles.text2}>Для того, чтобы задать вопрос, нужно нажать на вкладку "Задать вопрос".
                        После заполнить поля на странице и прекрепить фото-файлы, если имеются, а потом нажать на
                        кнопку "Отправить".</p>

                    <p className={styles.text1}>4. Как ответить на вопрос?</p>
                    <p className={styles.text2}>Чтобы ответить на вопрос, нужно выбрать интересующий вопрос и внизу
                        открывшейся страницы написать ответ. После отправить его нажав кнопку "Отправить".</p>

                    <p className={styles.text1}>5. Как удалить вопрос?</p>
                    <p className={styles.text2}>Чтобы удалить вопрос, нужно зайти на свой вопрос на вкладке "Вопросы"
                        или "Мои вопросы". Нажать на вопрос и в открывшейся странице нажать на кнопку "Удалить
                        вопрос".</p>

                    <p className={styles.text1}>6. Как удалить ответ?</p>
                    <p className={styles.text2}>Чтобы удалить ответ, нужно перейти на вкладку "Мои вопросы" или
                        "Вопросы". Выберите вопрос, в котором хотите удалить ответ и нажмите на кнопку удаления.</p>

                    <p className={styles.text1}>7. Как начисляются баллы?</p>
                    <p className={styles.text2}>Баллы начисляются за задачу вопроса, ответа на вопрос по следующей
                        схеме: 1 балл за ответ, 3 балла за выбор лучшего ответа и закрытия вопроса, 5 баллов за ответ,
                        который был выбран лучшим</p>
                </div>
            </main>
            <Footer/>
        </div>
    );
};

export default ReadMePage;