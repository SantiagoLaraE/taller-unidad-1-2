const formCommentsFields = formComments.querySelectorAll("input, textarea");
const formUpdateCommentsFields =
  formUpdateComments.querySelectorAll("input, textarea");

function setError(input, message) {
  input.insertAdjacentHTML(
    "afterend",
    `<span class="field-error">${message}</span>`
  );
}

function deleteErrors(form, formFields) {
  formFields.forEach((field) => {
    field.classList.remove("error");
  });
  const errors = form.querySelectorAll(".field-error");
  errors.forEach((error) => {
    error.remove();
  });
}

function resetInputs(formFields) {
  formFields.forEach((field) => {
    field.value = "";
  });

  closeModal();
}

function showSuccessMessage(form, formFields) {
  const submitButton = form.querySelector("button");

  const p = document.createElement("p");
  p.classList.add("success-message");
  p.innerHTML = "Tu comentario se ha publicado!";
  form.appendChild(p);

  setTimeout(() => {
    document.querySelector(".success-message").remove();
  }, 3000);

  resetInputs(formFields);
}

function checkCommentField(event, form, formFields, action) {
  event.preventDefault();
  deleteErrors(form, formFields);

  formFields.forEach((field) => {
    if (field.value === "") {
      field.classList.add("error");
      setError(field, `Ingresa un ${field.dataset.error}`);
    }
  });

  if (!form.querySelectorAll(".field-error").length) {
    const formData = new FormData(form);
    const data = {};

    for (const field of formData.keys()) {
      data[field] = formData.get(field);
    }

    const [, idArtwork] = location.hash.split("=");
    data.publish_date = formatDate();
    data.id_artwork = idArtwork;

    if (action === "add") {
      commentsService.addComment(data);
    } else if (action === "update") {
      commentsService.updateComment(data);
    }

    getComments(idArtwork);
    showSuccessMessage(form, formFields);
  }
}
function updateInput(field) {
  if (
    field.nextSibling.nodeName === "SPAN" &&
    field.nextSibling.classList.contains("field-error")
  ) {
    field.classList.remove("error");
    field.nextSibling.remove();
  }
}

formComments.addEventListener("submit", (event) => {
  checkCommentField(event, formComments, formCommentsFields, "add");
});

formUpdateComments.addEventListener("submit", (event) => {
  checkCommentField(
    event,
    formUpdateComments,
    formUpdateCommentsFields,
    "update"
  );
});

formCommentsFields.forEach((field) => {
  field.addEventListener("input", () => {
    updateInput(field);
  });
});

formUpdateCommentsFields.forEach((field) => {
  field.addEventListener("input", () => {
    updateInput(field);
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
