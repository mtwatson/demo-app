import Marionette from 'backbone.marionette';
import Backbone from 'backbone';
import ItemView from './ItemView';
import externalAgencyData from '../assets/data/agencyData.json';
import {
    CollectionView
} from 'backbone.marionette';


const agencyView = ItemView.extend();
const AgenciesCollectionView = CollectionView.extend({
    initialize() {

    },
    onDomRefresh() {

    },
    collection: new Backbone.Collection(externalAgencyData),
    childViewContainer: '.js-widgets',
    childView: agencyView,
    template: _.template('<div class="agency-header"><h1>Contributing Agencies for Case Data</h1></div><div class="js-widgets"></div>')
});


export default Marionette.Application.extend({
    region: '#app',
    onStart() {
        this.showView(new AgenciesCollectionView());
    },
});
