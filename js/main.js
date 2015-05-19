document.addEventListener("DOMContentLoaded", function (event) {
    //  Get the link element that references the templates.html file.
    var templatesImport = document.getElementById('templates');
// Retrieve the loaded templates.
    var templates = templatesImport.import;
// Get the template.
    var template = templates.getElementById('blog-post');
// Clone the template content.
    var clone = document.importNode(template.content, true);
// Add the blog post to the page.
    document.getElementById('insert-template-here').appendChild(clone);
});
