document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll("pre code").forEach((codeBlock) => {
        const button = document.createElement("button");
        button.innerText = "Copy";
        button.className = "copy-button";
        codeBlock.parentNode.style.position = "relative";
        codeBlock.parentNode.appendChild(button);

        button.addEventListener("click", () => {
            navigator.clipboard.writeText(codeBlock.innerText).then(() => {
                button.innerText = "Copied!";
                setTimeout(() => {
                    button.innerText = "Copy";
                }, 2000);
            });
        });
    });
});

