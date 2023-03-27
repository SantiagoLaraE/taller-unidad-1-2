const formCommentsFields = formComments.querySelectorAll("input, textarea");

function setError(input, message) {
  input.insertAdjacentHTML(
    "afterend",
    `<span class="field-error">${message}</span>`
  );
}

function deleteErrors() {
  const errors = formComments.querySelectorAll(".field-error");
  errors.forEach((error) => {
    error.remove();
  });
}

function resetInputs() {
  formCommentsFields.forEach((field) => {
    field.value = "";
  });
}

function showSuccessMessage() {
  const p = document.createElement("p");
  p.classList.add("success-message");
  p.innerHTML = "Tu comentario se ha publicado!";
  formComments.appendChild(p);
  btnFormComments.disabled = true;

  setTimeout(() => {
    document.querySelector(".success-message").remove();
    btnFormComments.disabled = false;
    resetInputs();
  }, 3000);
}

function checkCommentField(event) {
  event.preventDefault();
  deleteErrors();

  formCommentsFields.forEach((field) => {
    if (field.value === "") {
      field.classList.add("error");
      setError(field, `Ingresa un ${field.dataset.error}`);
    }
  });

  if (!formComments.querySelectorAll(".field-error").length) {
    const formData = new FormData(formComments);
    const data = {};

    for (const field of formData.keys()) {
      data[field] = formData.get(field);
    }

    data.publish_date = formatDate();

    console.log(data);
    showSuccessMessage();
  }
}

formComments.addEventListener("submit", checkCommentField);
formCommentsFields.forEach((field) => {
  field.addEventListener("input", () => {
    if (
      field.nextSibling.nodeName === "SPAN" &&
      field.nextSibling.classList.contains("field-error")
    ) {
      field.classList.remove("error");
      field.nextSibling.remove();
    }
  });
});

function formatDate() {
  const months = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];

  const date = new Date();
  const month = date.getMonth();
  const day = date.getDate();
  const year = date.getFullYear();

  const hour = date.getHours();
  const minutes = date.getMinutes();

  const formatedDate = `${day} de ${months[month]} del ${year}, ${hour}:${minutes}`;

  return formatedDate;
}
