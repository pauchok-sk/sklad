export default function inputFile() {
  const inputs = document.querySelectorAll(".input-file");

  if (inputs.length) {
    inputs.forEach((input) => {
      input.addEventListener("change", (e) => {
        const label = document.querySelector(`label[for="${input.id}"]`);

        if (e.target.files[0]) {
          label.querySelector("span").textContent = "Файл прикреплен";
        }
      });
    });
  }
}
