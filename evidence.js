const people = JSON.parse(localStorage.getItem("people") || "[]");

if (!localStorage.getItem("people")) {
    localStorage.setItem("people", JSON.stringify([]));
}

document.addEventListener("DOMContentLoaded", function () {
    const createPersonBtn = document.getElementById("createPersonBtn");
    const showListBtn = document.getElementById("showListBtn");
    const content = document.getElementById("content");

    createPersonBtn.addEventListener("click", function () {
        showCreateEditPersonForm();
    });

    showListBtn.addEventListener("click", function () {
        showPersonList();
    });

    function showCreateEditPersonForm(person = null) {
        content.innerHTML = `
            <h2>${person ? "Editovat" : "Založit"} osobu</h2>
            <form id="createEditPersonForm">
                <input type="hidden" id="uuid" value="${person ? person.uuid : ""}">
                <label for="name">Jméno:</label>
                <input type="text" id="name" name="name" maxlength="50" value="${person ? person.name : ""}" required>
                <br>
                <label for="surname">Příjmení:</label>
                <input type="text" id="surname" name="surname" maxlength="50" value="${person ? person.surname : ""}" required>
                <br>
                <label for="surname">Adresa:</label>
                <input type="text" id="address" name="address" maxlength="50" value="${person ? person.address : ""}" required>
                <br>
                <label for="surname">Město:</label>
                <input type="text" id="city" name="city" maxlength="50" value="${person ? person.city : ""}" required>
                <br>
                <label for="gender">Pohlaví:</label>
                <select id="gender" name="gender">
                    <option value="M" ${person && person.gender === "M" ? "selected" : ""}>Muž</option>
                    <option value="F" ${person && person.gender === "F" ? "selected" : ""}>Žena</option>
                </select>
                <br>
                <label for="birthdate">Datum narození:</label>
                <input type="text" id="birthdate" name="birthdate" pattern="^\\d{1,2}\\.\\d{1,2}\\.\\d{4}$" value="${person ? person.birthdate : ""}" required>
                <br>
                <button type="submit">Uložit</button>
                ${person ? '<button type="button" id="deleteBtn">Smazat</button>' : ''}
            </form>
        `;
        const createEditPersonForm = document.getElementById("createEditPersonForm");
        createEditPersonForm.addEventListener("submit", function (event) {
            event.preventDefault();
            createOrUpdatePerson();
        });

        if (person) {
            const deleteBtn = document.getElementById("deleteBtn");
            deleteBtn.addEventListener("click", function () {
                deletePerson(person.uuid);
            });
        }
    }
    
    function createOrUpdatePerson() {
        const uuid = document.getElementById("uuid").value;
        const name = document.getElementById("name").value;
        const surname = document.getElementById("surname").value;
        const address = document.getElementById("address").value;
        const city = document.getElementById("city").value;
        const gender = document.getElementById("gender").value;
        const birthdate = document.getElementById("birthdate").value;
        const person = {
            uuid: uuid || createUUID(),
            name: name,
            surname: surname,
            address: address,
            city: city,
            gender: gender,
            birthdate: birthdate,
        };
        const index = people.findIndex((p) => p.uuid === uuid);
    
        if (index !== -1) {
            people[index] = person;
        } else {
            people.push(person);
        }
    
        localStorage.setItem("people", JSON.stringify(people));
        showPersonList();
    }
    
    function deletePerson(uuid) {
        const index = people.findIndex((p) => p.uuid === uuid);
    
        if (index !== -1) {
            people.splice(index, 1);
        }
    
        localStorage.setItem("people", JSON.stringify(people));
        showPersonList();
    }
    
    function showPersonList() {
        content.innerHTML = `
            <h2>Seznam osob</h2>
            <table>
                <thead>
                    <tr>
                        <th>Příjmení</th>
                        <th>Jméno</th>
                        <th>Adresa</th>
                        <th>Obec</th>
                        <th>Pohlaví</th>
                        <th>Datum narození</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    ${people
                        .sort((a, b) => a.surname.localeCompare(b.surname))
                        .map((person) => `
                            <tr>
                                <td>${person.surname}</td>
                                <td>${person.name}</td>
                                <td>${person.address}</td>
                                <td>${person.city}</td>
                                <td>${person.gender === "M" ? "Muž" : "Žena"}</td>
                                <td>${person.birthdate}</td>
                                <td><button class="editBtn" data-uuid="${person.uuid}">Editovat</button></td>
                            </tr>
                        `)
                        .join("")}
                </tbody>
            </table>
        `;
        const editBtns = document.querySelectorAll(".editBtn");
    
        editBtns.forEach((btn) => {
            btn.addEventListener("click", function () {
                const uuid = this.getAttribute("data-uuid");
                const person = people.find((p) => p.uuid === uuid);
                showCreateEditPersonForm(person);
            });
        });
    }

    
    
    function createUUID() {
        let dt = new Date().getTime();
        const uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
            const r = (dt + Math.random() * 16) % 16 | 0;
            dt = Math.floor(dt / 16);
            return (c === "x" ? r : (r & 0x3 | 0x8)).toString(16);
        });
        return uuid;
    }
});    
