type Employee = {
    name:string;
    email:string;
    designation:string;
}
var  employeeList:Employee[] = [];
function submitForm() {

    const nameInput = document.getElementById('name') as HTMLInputElement;
    const emailInput = document.getElementById('email') as HTMLInputElement;
    const designationInput = document.getElementById('designation') as HTMLInputElement;

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const designation = designationInput.value.trim();

    if (!name || !email || !designation) {
        alert('Please fill in all fields');
        return;
    }

    const newEmployee:Employee = {
        name: name,
        email: email,
        designation: designation
    };

    employeeList.push(newEmployee)
    showEmployeeList();
}
const deleteEmp = (email:string):Employee[]=>{
    employeeList = employeeList.filter(emp=>{emp.email != email});
    showEmployeeList();
    return employeeList;
}

function showEmployeeList():void{
    let html:string = "";
    console.log(employeeList)
    employeeList.forEach(element => {
        html += `<tr>
                    <td>
                    ${element.name}
                    </td>
                    <td>
                    ${element.email}
                    </td>
                    <td>
                    ${element.designation}
                    </td>
                    <td>
                        <input type="button" value="Delete" onclick=${deleteEmp(element.email)} />
                    </td>
                <tr>`;
    });
    html = `<table border="1">
            ${html}
        </table>`;
        const myElement = document.getElementById("myElement");

        if (myElement !== null) {
            myElement.innerHTML = html;
        }
}
