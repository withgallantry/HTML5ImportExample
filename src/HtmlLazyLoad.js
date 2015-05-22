!(function () {

    var HTMLIncludeElement = Object.create(HTMLElement.prototype); //Create a copy of the HTMLElement prototype

    HTMLIncludeElement.getIncludeName = function () { //Add function to get the include name. this is scoped to the node.
        return this.getAttribute('src');
    };

    HTMLIncludeElement.getIncludeContent = function () { //Add function to get the include content once set
        return this.includeContent;
    };

    HTMLIncludeElement.getIncludeRef = function () { //Get the ref of the block to use from include.
        return this.getAttribute('ref');
    };

    HTMLIncludeElement.fetchIncludeContent = function () { //Fetch the include content via ajax, fire event upon completion.
        var includeName = this.getIncludeName();
        var xhr = new XMLHttpRequest();
        xhr.open('GET', includeName, true);
        xhr.onreadystatechange = function (resp) {
            if (xhr.readyState !== 4) return;
            if (xhr.status !== 200) return;
            this.includeContent = xhr.response;
            var event = new CustomEvent('include-fetched', {includeName: includeName, includeContent: this.includeContent});
            this.dispatchEvent(event);
        }.bind(this);
        xhr.send();
    };

    HTMLIncludeElement.replaceWithIncludeBlock = function () {
        var ref = this.getIncludeRef();
        var includeContent = this.getIncludeContent();
        var includeFromContent = new DOMParser().parseFromString(includeContent, "text/html");
        var nodeContent = includeFromContent.getElementById(ref);
        //nodeContent.__proto__ = this.__proto__;
        var event = new CustomEvent('include-complete', {});
        this.dispatchEvent(event);
        this.parentNode.replaceChild(nodeContent, this);
        this.removeEventListener('include-fetched',this.replaceWithIncludeBlock);
    };

    this.getIncludeNodes = function () {
        return Array.prototype.slice.call(document.getElementsByTagName('include'));
    };

    this.upgradeNode = function (node) {
        node.__proto__ = HTMLIncludeElement; //Replace prototype with custom prototype extended from HTMLElement prototype.
        node.fetchIncludeContent(); //Start ajax request to get data.
        node.addEventListener('include-fetched', node.replaceWithIncludeBlock); //Add event listener for when the ajax request has completed. This will replace include node with the correct HTML include
    }

    document.addEventListener('DOMContentLoaded', function () {
        this.getIncludeNodes().forEach(function (node) {
            this.upgradeNode(node); //Replaces the prototype of the include nodes with prototype created.
        }.bind(this));
    }.bind(this), false);


}).call(HtmlLazyLoad = {});