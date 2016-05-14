'use strict';
var _ = require('lodash');

class channel {

    static createChannel(attributes) {

        var defaultAttributes = {
            'id': 'fake-general-channel-id',
            'name': 'general',
            'is_channel': true,
            'created': 1458000230,
            'creator': 'U0SNL23B4',
            'is_archived': false,
            'is_general': true,
            'has_pins': false,
            'is_member': true,
            'unread_count': 807,
            'unread_count_display': 806,
            '_status': 0,
            '_fulfilledCallbacks': [],
            '_rejectedCallbacks': [],
            '_progressCallbacks': [],
            'members': [
                'U0SNL23B4',
                '1234'
            ],
            'topic': {
                'value': 'Company-wide announcements and work-based matters',
                'creator': '',
                'last_set': 0
            },
            'purpose': {
                'value': 'This channel is for team-wide communication and announcements. All team members are in this channel.',
                'creator': '',
                'last_set': 0
            }
        };

        return _.merge(defaultAttributes, attributes);
    }

    static createChannelList() {
        return [
            this.createChannel()
        ];
    }

}

module.exports = channel;
