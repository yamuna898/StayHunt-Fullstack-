console.log("came to js");
const u = document.querySelector(".imgurl");
const p = document.querySelector("#imgPreview");

u.addEventListener("change", () => {
    console.log("change event triggered");
    const url = u.value.trim();

    //No url
    if (url === "") {
        p.style.backgroundColor = "yellow";
        p.src = "";
        return;
    }

    // invalid image URL handling
    p.onerror = () => {
        p.style.backgroundColor = "red";
    };

    p.src = url;
    p.style.display = "block";
});
