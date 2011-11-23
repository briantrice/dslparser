/**
 * Created by JetBrains WebStorm.
 * User: capacman
 * Date: 11/22/11
 * Time: 5:39 PM
 * To change this template use File | Settings | File Templates.
 */
define('globalmaksimum/autocomplete', ['ace/ace','ace/range'], function(require, exports, module) {

    var Autocomplete = function(editor, matches) {
        this.matches = matches;
        this.golinedown = editor.commands.commands['golinedown'].exec;
        this.golineup = editor.commands.commands['golineup'].exec;
        this.originalOnTextInput = editor.onTextInput;
        this.originalSoftTabs = editor.session.getUseSoftTabs();
        this.editor = editor;
        // Create the suggest list
        this.element = document.createElement('ul');
        this.element.className = 'ace_autocomplete';
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
                if (li.className == 'ace_autocomplete_selected') {
                    return li;
                }
            }

        }

        this.focusNext = function() {
            var curr = this.current();
            curr.className = '';
            var focus = curr.nextSibling || curr.parentNode.firstChild;
            focus.className = 'ace_autocomplete_selected';
        }

        this.focusPrev = function() {
            var curr = this.current();
            curr.className = '';
            var focus = curr.previousSibling || curr.parentNode.lastChild;
            focus.className = 'ace_autocomplete_selected';
        }

        this.ensureFocus = function() {
            if (!this.current()) {
                this.element.firstChild.className = 'ace_autocomplete_selected';
            }
        }

        this.replace=function() {
            //var Range = require().Range;
            var range = new Range(self.row, self.column, self.row, self.column + 1000);
            // Firefox does not support innerText property, don't know about IE
            // http://blog.coderlab.us/2005/09/22/using-the-innertext-property-with-firefox/
            var selectedValue;
            if (document.all) {
                selectedValue = this.current().innerText;
            } else {
                selectedValue = this.current().textContent;
            }

            this.editor.session.replace(range, selectedValue);
            // Deactivate asynchrounously, so that in case of ENTER - we don't reactivate immediately.
            setTimeout(function() {
                this.deactivate();
            }, 0);
        }

        this.deactivate=function() {
            // Hide list
            this.element.style.display = 'none';

            // Restore keyboard
            this.editor.session.setUseSoftTabs(originalSoftTabs);
            this.editor.commands.commands['golinedown'].exec = this.golinedown;
            this.editor.commands.commands['golineup'].exec = this.golineup;
            this.editor.onTextInput = this.originalOnTextInput;

            this.active = false;
        }

        // Shows the list and reassigns keys
        this.activate = function(row, column) {
            if (this.active) return;
            this.active = true;
            this.row = row;
            this.column = column;

            // Position the list
            var coords = this.editor.renderer.textToScreenCoordinates(row, column);
            this.element.style.top = coords.pageY + 2 + 'px';
            this.element.style.left = coords.pageX + -2 + 'px';
            this.element.style.display = 'block';

            // Take over the keyboard
            this.editor.session.setUseSoftTabs(false);
            this.editor.commands.commands['golinedown'].exec = function(env, args, request) {
                this.focusNext();
            };
            this.editor.commands.commands['golineup'].exec = function(env, args, request) {
                this.focusPrev();
            };
            this.editor.commands.addCommand({
                name: "hideautocomplete",
                bindKey: {win: "Esc", mac: "Esc", sender: "editor"},
                exec: function(env, args, request) {
                    this.deactivate();
                }
            });

            this.editor.onTextInput = function(text) {
                if (text == '\n' || text == '\t') {
                    this.replace();
                } else {
                    this.originalOnTextInput.call(editor, text);
                }
            };
        };

        // Sets the text the suggest should be based on.
        // afterText indicates the position where the suggest box should start.
        this.suggest = function(text) {
            var options = this.matches(text);
            if (options.length == 0) {
                return this.deactivate();
            }
            var html = '';
            for (var n in options) {
                html += '<li>' + options[n] + '</li>';
            }
            this.element.innerHTML = html;
            this.ensureFocus();
        }
    }).call(Autocomplete.prototype);
    exports.Autocomplete = Autocomplete;
});
