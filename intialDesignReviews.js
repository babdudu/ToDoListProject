
class User {
    constructor(username, email, password) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.children = []; 
        this.tasks = []; 

    }
        login() {}
        viewAllTasks() {
            return this.tasks;
        }
        searchTasks() {}
        createChildProfiles(){}
        
    }



class Authentication {
    constructor(username, password) {
        this.username = username;
        this.password = password;
    }

    verifyUser() {}
    logout() {}
}



class Task {
    constructor(taskID, description, dueDate, priority, status, linkedChild) {
        this.taskID = taskID;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority; // High, Medium, Low
        this.status = status; // Complete/Incomplete
        this.linkedChild = linkedChild;
    }

    addTask() {}
    deleteTask(){}
    setTaskPriority() {}
    updateTask() {}
    markTaskComplete(){}
    assignTaskToChild(child) {}
}


class ChildProfile {
    constructor(childID, childName, childAge) {
        this.childID = childID;
        this.childName = childName;
        this.childAge=childAge;
        this.assignedTasks = []; 
    }

    viewAssignedTasks() {}
}
