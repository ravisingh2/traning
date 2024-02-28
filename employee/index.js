var employeeList = [];
function submitForm() {
    var nameInput = document.getElementById('name');
    var emailInput = document.getElementById('email');
    var designationInput = document.getElementById('designation');
    var name = nameInput.value.trim();
    var email = emailInput.value.trim();
    var designation = designationInput.value.trim();
    if (!name || !email || !designation) {
        alert('Please fill in all fields');
        return;
    }
    var newEmployee = {
        name: name,
        email: email,
        designation: designation
    };
    employeeList.push(newEmployee);
    showEmployeeList();
}
var deleteEmp = function (email) {
    employeeList = employeeList.filter(function (emp) { emp.email != email; });
    showEmployeeList();
    return employeeList;
};
function showEmployeeList() {
    var html = "";
    console.log(employeeList);
    employeeList.forEach(function (element) {
        html += "<tr>\n                    <td>\n                    " + element.name + "\n                    </td>\n                    <td>\n                    " + element.email + "\n                    </td>\n                    <td>\n                    " + element.designation + "\n                    </td>\n                    <td>\n                        <input type=\"button\" value=\"Delete\" onclick=" + deleteEmp(element.email) + " />\n                    </td>\n                <tr>";
    });
    html = "<table border=\"1\">\n            " + html + "\n        </table>";
    var myElement = document.getElementById("myElement");
    if (myElement !== null) {
        myElement.innerHTML = html;
    }
}
