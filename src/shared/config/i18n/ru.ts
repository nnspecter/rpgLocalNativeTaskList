export default {
  auth: {
    login: {
      title: "С возвращением",
      subtitle: "Войдите в свой аккаунт",
      button: "Войти",
      noAccount: "Нет аккаунта?",
      register: "Регистрация",
    },
    registration: {
      title: "Регистрация",
      subtitle: "Создайте новый аккаунт",
      button: "Зарегистрироваться",
      hasAccount: "Есть аккаунт?",
      login: "Войти",
    },
    fields: {
      username: "Логин",
      password: "Пароль",
    },
    errors: {
      minLength: "Минимум 4 символа в полях",
      invalidCredentials: "Неверный логин или пароль",
      usernameTaken: "Логин уже используется",
    },
  },

  tasks: {
    totalTasks: "Всего задач: {{count}}",
    sort: {
      byName: "По имени",
      timeAsc: "Время ↑",
      timeDesc: "Время ↓",
    },
  },

  taskDialog: {
    newTask: {
      title: "Новая задача",
      createBtn: "Создать задачу",
      submit: "Создать",
    },
    editTask: {
      title: "Редактирование задачи",
      submit: "Сохранить",
    },
    deleteTask: {
      title: "Удаление задачи",
      confirm: "Вы точно хотите удалить задачу \"{{name}}\"?",
      submit: "Удалить",
    },
    fields: {
      taskName: "Название задачи",
      description: "Описание",
    },
    cancel: "Отмена",
  },

  metrics: {
    streak: "Стрик",
    done: "Выполнено",
  },

  character: {
    level: "Уровень {{lvl}}",
    xpLabel: "Очки опыта",
    xpToNext: "{{xp}} XP до уровня {{lvl}}",
  },

};