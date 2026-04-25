export default {
  auth: {
    login: {
      title: "Welcome back",
      subtitle: "Sign in to your account",
      button: "Sign In",
      noAccount: "Don't have an account?",
      register: "Sign Up",
    },
    registration: {
      title: "Registration",
      subtitle: "Create a new account",
      button: "Register",
      hasAccount: "Already have an account?",
      login: "Sign In",
    },
    fields: {
      username: "Username",
      password: "Password",
    },
    errors: {
      minLength: "Minimum 4 characters required",
      invalidCredentials: "Invalid username or password",
      usernameTaken: "Username is already taken",
    },
  },

  tasks: {
    totalTasks: "Total tasks: {{count}}",
    sort: {
      byName: "By name",
      timeAsc: "Time ↑",
      timeDesc: "Time ↓",
    },
  },

  taskDialog: {
    newTask: {
      title: "New Task",
      createBtn: "Create Task",
      submit: "Create",
    },
    editTask: {
      title: "Edit Task",
      submit: "Save",
    },
    deleteTask: {
      title: "Delete Task",
      confirm: "Are you sure you want to delete task \"{{name}}\"?",
      submit: "Delete",
    },
    fields: {
      taskName: "Task name",
      description: "Description",
    },
    cancel: "Cancel",
  },
  metrics: {
    streak: "Streak",
    done: "Completed",
  },

  character: {
    level: "Level {{lvl}}",
    xpLabel: "Experience",
    xpToNext: "{{xp}} XP to level {{lvl}}",
  },
};