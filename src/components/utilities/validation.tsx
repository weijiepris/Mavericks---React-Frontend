export const validateEmployee = (name: string, salary: any, department: string): Promise<boolean> => {
    return new Promise((resolve, reject) => {
        if (!name)
            reject("Name cannot be empty");

        if (name.length < 4 || name.length > 30) {
            reject("Name must consist of 4 - 30 characters only");
        }

        if (!salary)
            reject("Salary cannot be empty");

        if (isNaN(salary)) {
            reject("Salary must be a number");
        }

        if (salary < 0) {
            reject("Salary cannot be negative");
        }

        if (!department || department === "")
            reject("You have not selected a department");

        resolve(true);
    });
};
