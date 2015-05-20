!(function () {

    this.includeNodes = [];

    this.getTemplateFromUrl = function (url, callback) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.onreadystatechange = function (resp) {
            if (xhr.readyState !== 4) return;
            if (xhr.status !== 200) return;
            callback(url, xhr.response);
        }.bind(this);
        xhr.send();
    };

    this.replaceTemplateDomNodes = function (templateId, content) {
        var nodes = this.includeNodes;
        nodes.forEach(function (node) {
            if (node.getAttribute('src') == templateId) {
                var ref = node.getAttribute('ref');
                this.replaceNode(node, content, ref);
            }
        }.bind(this));
    };

    this.replaceNode = function (node, content, ref) {
        //Refactor this to avoid multiple DOMParser calls, cache, cache, CACHE
        var templateContent = new DOMParser().parseFromString(content, "text/html");
        var nodeContent = templateContent.getElementById(ref);
        node.parentNode.replaceChild(nodeContent, node);
    };

    this.getTemplatesToFetch = function (nodes) {
        function onlyUnique(value, index, self) {
            return self.indexOf(value) === index;
        }

        var templateUrls = [];
        nodes.forEach(function (node) {
            var templateUrl = node.getAttribute('src');
            templateUrls.push(templateUrl);
        }.bind(this));

        return templateUrls.filter(onlyUnique);
    };

    this.fetchTemplatesAndReplaceHtml = function (templateList) {
        templateList.forEach(function (templateUrl) {
            this.getTemplateFromUrl(templateUrl, function(templateId, templateContent) {
                this.replaceTemplateDomNodes(templateId, templateContent);
            }.bind(this));
        }.bind(this));
    };

    this.replaceNodesWithHtml = function () {
        this.includeNodes = Array.prototype.slice.call(document.getElementsByTagName('include'));
        var templateList = this.getTemplatesToFetch(this.includeNodes);
        this.fetchTemplatesAndReplaceHtml(templateList);
    };

    document.addEventListener('DOMContentLoaded', function () {
        this.replaceNodesWithHtml();
    }.bind(this), false);


}).call(HtmlLazyLoad = {});
