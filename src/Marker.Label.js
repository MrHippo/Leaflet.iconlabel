L.Marker.Label = L.Marker.extend({
	_initIcon: function () {
		// Ensure that the label is hidden to begin with
		if (this.options.revealing) {
			this.options.icon.setLabelAsHidden();
		}

		L.Marker.prototype._initIcon.call(this);
	},

	_removeIcon: function () {
		L.Marker.prototype._removeIcon.call(this);

		if (!this.options.revealing) {
			return;
		}

		L.DomEvent
			.off(this._icon, 'mouseover', this._showLabel)
			.off(this._icon, 'mouseout', this._hideLabel);
	},

	_initInteraction: function () {
		L.Marker.prototype._initInteraction.call(this);

		if (!this.options.revealing) {
			return;
		}

		L.DomEvent
			.on(this._icon, 'mouseover', this._showLabel, this)
			.on(this._icon, 'mouseout', this._hideLabel, this);
	},

	_showLabel: function () {
		this.options.icon.showLabel(this._icon);
	},

	_hideLabel: function () {
		this.options.icon.hideLabel(this._icon);
	}
});