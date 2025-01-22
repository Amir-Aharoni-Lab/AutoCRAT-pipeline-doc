document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll("pre code").forEach((codeBlock) => {
        // Create the copy button
        const button = document.createElement("button");
        button.innerText = "Copy";
        button.className = "copy-button";

        // Add button to the parent <pre> tag (container of code block)
        const pre = codeBlock.parentNode;
        pre.style.position = "relative"; // Ensure proper positioning for the button
        pre.appendChild(button);

        // Add click event to copy the code content
        button.addEventListener("click", () => {
            navigator.clipboard.writeText(codeBlock.innerText).then(() => {
                // Provide feedback when the copy is successful
                button.innerText = "Copied!";
                setTimeout(() => {
                    button.innerText = "Copy";
                }, 2000); // Reset text after 2 seconds
            });
        });
    });
});

