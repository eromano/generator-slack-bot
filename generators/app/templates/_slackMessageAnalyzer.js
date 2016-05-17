'use strict';

class slackMessageAnalyzer {

    /**
     * Create a slack link format message
     *
     * @param {String} titleLink  text to show instead of the pure URL
     * @param {String} link to redirect
     *
     * @return {String} slack format message link
     */
    static createSlackMessageLink(titleLink, link) {
        return '<' + link + '|' + titleLink + '>';
    }

    /**
     * Create a slack link format message
     *
     * @param {String} textMessage message to analyze
     * @param {String} textToSearch text to search in the message
     *
     * @return {String} slack format message link
     */
    static isTextContainedInMessage(textMessage, textToSearch) {
        return textMessage && textMessage.toLowerCase().indexOf(textToSearch) > -1;
    }
}

module.exports = slackMessageAnalyzer;
