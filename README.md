# Html Lazy Load v0.2
Small library that allows you to lazy load html. The library parses HTML and replaces <include> nodes with appropriate HTML blocks from specified template files. Great for lazy loading content after a smaller payload page has rendered. Needs optimization specifically around caching and event listeners.

#Usage
Simple to use, just include the TemplateEngine.js in the head section of your page.
```javascript
<script src="js/TemplateEngine.js"></script>
```
</br>
Add include nodes with a src attribute pointing to your temaplte file and a ref attribute that points to the id of the html to include from the template file.
```javascript
<include src="templateFile.html" ref="blockOne"></include>
```
</br>
Sample template file:
```html
<div id="blockOne">
    <h1>Example Blog Post</h1>
    <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce imperdiet leo ut velit mollis sollicitudin. Aenean mollis non nunc vel sodales. Cras eget ultricies sapien. Aenean ut hendrerit nibh. Donec semper, magna id pellentesque mollis, orci diam bibendum lacus, nec iaculis odio augue eu lectus. Duis rutrum at arcu in sodales. In in ex urna.
    </p>
</div>
```
