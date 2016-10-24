import DS from 'ember-data';

export default DS.JSONSerializer.extend({
  normalizeDeleteRecordResponse(store, primaryModelClass, payload, id, requestType) {
    payload = { id: id };
    return this._super(store, primaryModelClass, payload, id, requestType);
  }
});
