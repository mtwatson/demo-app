import Marionette from 'backbone.marionette';
import template from '../templates/item.jst';
import _ from 'lodash';
import axios from 'axios';

export default Marionette.View.extend({
    template: template,
    randomResolve() {
        // This is simply here to simulate an external API
        // call to gather additional data.
        // One would never do this in real life.
        return new Promise((resolve, reject) => {
            setTimeout(
                () => resolve(),
                Math.random() * 1500
            );
        });
    },
    onDomRefresh() {
        const self = this;
        this.randomResolve().then(() => {
           self.$('.lds-ring').hide();
           self.$('.agency-data').show();
        });
    },

});
