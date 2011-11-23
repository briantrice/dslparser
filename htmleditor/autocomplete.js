/**
 * Created by JetBrains WebStorm.
 * User: capacman
 * Date: 11/22/11
 * Time: 5:39 PM
 * To change this template use File | Settings | File Templates.
 */
define('globalmaksimum/autocomplete', ['ace/ace','ace/range'], function(require, exports, module) {
    var Range = require('ace/range').Range;
    var Autocomplete = function(editor) {
        this.golinedown = editor.commands.commands['golinedown'].exec;
        this.golineup = editor.commands.commands['golineup'].exec;
        this.originalOnTextInput = editor.onTextInput;
        this.originalSoftTabs = editor.session.getUseSoftTabs();
        this.editor = editor;
        // Create the suggest list
        this.element = document.createElement('ul');
        this.element.className = 'ace_autocomplete ui-autocomplete ui-menu ui-widget ui-widget-content ui-corner-all';
        this.element.style.display = 'none';
        this.element.style.listStyleType = 'none';
        this.element.style.padding = '2px';
        this.element.style.position = 'fixed';
        this.element.style.zIndex = '1000';
        this.editor.container.appendChild(this.element);
    };
    (function() {
        //var self = this;


        this.current = function() {
            var children = this.element.childNodes;
            for (var i = 0; i < children.length; i++) {
                var li = children[i];
                if (li.className == 'ui-menu-item ace_autocomplete_selected') {
                    return li;
                }
            }

        };

        this.focusNext = function() {
            var curr = this.current();
            curr.className = 'ui-menu-item';
            var focus = curr.nextSibling || curr.parentNode.firstChild;
            focus.className = 'ui-menu-item ace_autocomplete_selected';
        };

        this.focusPrev = function() {
            var curr = this.current();
            curr.className = 'ui-menu-item';
            var focus = curr.previousSibling || curr.parentNode.lastChild;
            focus.className = 'ui-menu-item ace_autocomplete_selected';
        };

        this.ensureFocus = function() {
            if (!this.current()) {
                this.element.firstChild.className = 'ui-menu-item ace_autocomplete_selected';
            }
        };

        this.replace = function() {

            var range = new Range(this.row, this.column, this.row, this.column + 1000);
            // Firefox does not support innerText property, don't know about IE
            // http://blog.coderlab.us/2005/09/22/using-the-innertext-property-with-firefox/
            var selectedValue;
            if (document.all) {
                selectedValue = this.current().innerText;
            } else {
                selectedValue = this.current().textContent;
            }

            this.editor.session.replace(range, selectedValue);
            var self = this;
            // Deactivate asynchrounously, so tha in case of ENTER - we don't reactivate immediately.
            setTimeout(function() {
                self.deactivate();
            }, 0);
        };

        this.deactivate = function() {
            // Hide list
            this.element.style.display = 'none';

            // Restore keyboard
            this.editor.session.setUseSoftTabs(this.originalSoftTabs);
            this.editor.commands.commands['golinedown'].exec = this.golinedown;
            this.editor.commands.commands['golineup'].exec = this.golineup;
            this.editor.onTextInput = this.originalOnTextInput;

            this.active = false;
        };

        // Shows the list and reassigns keys
        this.activate = function(row, column) {
            if (this.active) return;
            this.active = true;
            this.row = row;
            this.column = column;

            // Position the list
            var coords = this.editor.renderer.textToScreenCoordinates(row, column);
            this.element.style.top = coords.pageY + 15 + 'px';
            this.element.style.left = coords.pageX + -2 + 'px';
            this.element.style.display = 'block';

            // Take over the keyboard
            this.editor.session.setUseSoftTabs(false);

            //assign 'this' to 'self' to access 'this' by 'self' variable because of closure scope
            var self = this;
            this.editor.commands.commands['golinedown'].exec = function(env, args, request) {
                self.focusNext();
            };
            this.editor.commands.commands['golineup'].exec = function(env, args, request) {
                self.focusPrev();
            };
            this.editor.commands.addCommand({
                name: "hideautocomplete",
                bindKey: {win: "Esc", mac: "Esc", sender: "editor"},
                exec: function(env, args, request) {
                    self.deactivate();
                }
            });

            this.editor.onTextInput = function(text) {
                if (text == '\n' || text == '\t') {
                    self.replace();
                } else {
                    self.originalOnTextInput.call(self.editor, text);
                }
            };
        };

        this.matches = function(text, completationOptions) {
            var regEx = new RegExp('[\\w\\d]*' + text + '[\\w\\d]*', 'i');
            var result = []
            $.each(completationOptions, function(index, data) {
                if (regEx.test(data))
                    result.push(data);
            });
            return result;
        };

        // Sets the text the suggest should be based on.
        // afterText indicates the position where the suggest box should start.
        this.suggest = function(text, completationOptions) {
            var options = this.matches(text, completationOptions);
            if (options.length == 0) {
                return this.deactivate();
            }
            var html = '';
            for (var n in options) {
                html += '<li class="ui-menu-item">' + options[n] + '</li>';
            }
            this.element.innerHTML = html;
            this.ensureFocus();
        };
    }).call(Autocomplete.prototype);
    exports.Autocomplete = Autocomplete;
});
