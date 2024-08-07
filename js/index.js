const main = document.querySelector("main");
const addContactBtn = document.querySelector(".new-contact-btn");

addContactBtn.addEventListener("click", clickNewContact);

function clickNewContact() {
  if (hasAddContactWindow()) {
    removeAddContactWindow();
    renameButtonNewContact();
  } else {
    createAddContactWindow();
    renameButtonNewContact();
  }
  maskPhone();
}

function clickAddContact() {
  createContactCard(collectInfoFromInput());
}

function collectInfoFromInput() {
  const inputs = document.querySelectorAll(".info-contact");

  const formData = {};

  inputs.forEach((input) => {
    formData[input.name] = input.value;
  });

  console.log(formData);
  return formData;
}

function createContactCard(contactInfo) {
  console.log(contactInfo);
  const contentBlock = document.querySelector(".phonebook__content");
  const contactBlock = document.createElement("div");
  contactBlock.setAttribute("id", contactInfo.number);
  contactBlock.className = "phonebook__contact";

  const nameContact = document.createElement("p");
  nameContact.innerText = `${contactInfo.name}`;
  const phoneNumberContact = document.createElement("p");
  phoneNumberContact.innerText = `${contactInfo.number}`;

  contactBlock.appendChild(nameContact);
  contactBlock.appendChild(phoneNumberContact);

  contentBlock.appendChild(contactBlock);
}

function hasAddContactWindow() {
  if (document.querySelector(".phonebookAddContact")) {
    return true;
  } else {
    return false;
  }
}

function createAddContactWindow() {
  createPhonebookBlock();
  createPhoneNumberInputBlock("Номер телефона:");
  createContactInformationInputBlock("Личные данные:");
}

function removeAddContactWindow() {
  document.querySelector(".phonebookAddContact").remove();
}

function renameButtonNewContact() {
  const nameButton = document.querySelector(".new-contact-btn").innerText;

  if (nameButton === "Новый контакт") {
    document.querySelector(".new-contact-btn").innerHTML = "Закрыть";
  } else if (nameButton === "Закрыть") {
    document.querySelector(".new-contact-btn").innerHTML = "Новый контакт";
  } else {
    console.error("function renameButtonNewContact");
  }
}

function createPhonebookBlock() {
  const phonebookBlock = document.createElement("div");
  phonebookBlock.classList.add("phonebook", "phonebookAddContact");

  const headerBlock = document.createElement("div");
  headerBlock.classList.add("phonebookAddContact__header");
  headerBlock.textContent = "Добавление контакта";

  const contentBlock = document.createElement("div");
  contentBlock.classList.add("phonebookAddContact__content");

  const footerBlock = document.createElement("div");
  footerBlock.classList.add("phonebookAddContact__footer");

  const addButton = document.createElement("button");
  addButton.textContent = "Добавить";
  addButton.classList.add("add-contact-btn");
  footerBlock.appendChild(addButton);

  phonebookBlock.appendChild(headerBlock);
  phonebookBlock.appendChild(contentBlock);
  phonebookBlock.appendChild(footerBlock);
  main.appendChild(phonebookBlock);

  addButton.addEventListener("click", clickAddContact);
}

function createPhoneNumberInputBlock(name) {
  const contentBlock = document.querySelector(".phonebookAddContact__content");

  const nameInput = document.createElement("p");
  nameInput.className = "phonebookAddContact__name-input";
  nameInput.innerText = name;

  const phoneNumberInput = document.createElement("input");
  phoneNumberInput.className = "info-contact phonebookAddContact__number-input";
  phoneNumberInput.classList.add("number");
  phoneNumberInput.setAttribute("name", `number`);

  const container = document.createElement("div");

  container.appendChild(nameInput);
  container.appendChild(phoneNumberInput);
  contentBlock.appendChild(container);
}

function createContactInformationInputBlock(name) {
  const contentBlock = document.querySelector(".phonebookAddContact__content");

  const nameInput = document.createElement("p");
  nameInput.className = "phonebookAddContact__name-input";
  nameInput.innerText = name;

  const contactName = document.createElement("input");
  contactName.className =
    "info-contact contact-name phonebookAddContact__information-input";
  contactName.classList.add("information");
  contactName.placeholder = "Введите имя";
  contactName.setAttribute("name", `name`);

  const contactSurname = document.createElement("input");
  contactSurname.className =
    "info-contact contact-surname phonebookAddContact__information-input";
  contactSurname.classList.add("information");
  contactSurname.placeholder = "Введите фамилию";
  contactSurname.setAttribute("name", `surname`);

  const contactPatronymic = document.createElement("input");
  contactPatronymic.className =
    "info-contact contact-patronymic phonebookAddContact__information-input";
  contactPatronymic.classList.add("information");
  contactPatronymic.placeholder = "Введите отчество";
  contactPatronymic.setAttribute("name", `patronymic`);

  const container = document.createElement("div");

  container.appendChild(nameInput);
  container.appendChild(contactName);
  container.appendChild(contactSurname);
  container.appendChild(contactPatronymic);

  contentBlock.appendChild(container);
}

function createTextArea(name) {
  const contentBlock = document.querySelector(".phonebookAddContact__content");
  const textAreaBlock = document.createElement("div");
  textAreaBlock.className = "phonebookAddContact__textarea-block";

  const nameTextArea = document.createElement("p");
  nameTextArea.innerText = name;
  textAreaBlock.appendChild(nameTextArea);

  const textArea = document.createElement("textarea");
  textArea.setAttribute("name", name);
  textArea.className = "info-contact";
  textAreaBlock.appendChild(textArea);
  contentBlock.appendChild(textAreaBlock);
}

function maskPhone() {
  [].forEach.call(document.querySelectorAll(".number"), function (input) {
    var keyCode;
    function mask(event) {
      event.keyCode && (keyCode = event.keyCode);
      var pos = this.selectionStart;
      if (pos < 3) event.preventDefault();
      var matrix = "+7 (___)-___-__-__",
        i = 0,
        def = matrix.replace(/\D/g, ""),
        val = this.value.replace(/\D/g, ""),
        new_value = matrix.replace(/[_\d]/g, function (a) {
          return i < val.length ? val.charAt(i++) || def.charAt(i) : a;
        });
      i = new_value.indexOf("_");
      if (i != -1) {
        i < 5 && (i = 3);
        new_value = new_value.slice(0, i);
      }
      var reg = matrix
        .substr(0, this.value.length)
        .replace(/_+/g, function (a) {
          return "\\d{1," + a.length + "}";
        })
        .replace(/[+()]/g, "\\$&");
      reg = new RegExp("^" + reg + "$");
      if (
        !reg.test(this.value) ||
        this.value.length < 5 ||
        (keyCode > 47 && keyCode < 58)
      )
        this.value = new_value;
      if (event.type == "blur" && this.value.length < 5) this.value = "";
    }

    input.addEventListener("input", mask, false);
    input.addEventListener("focus", mask, false);
    input.addEventListener("blur", mask, false);
    input.addEventListener("keydown", mask, false);
  });
}
