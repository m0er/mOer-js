(function($, undefined) {
	$.initContextUrl = function() {
		if (CONTEXT_PATH == null || CONTEXT_PATH === "") {
			throw "CONTEXT_PATH가 필요합니다";
		} if (CONTEXT_PATH === "/") {
			return;
		}
		
		$("body [href], body [src], body [action]").each(function(index, value) {
			var $this = $(this);
			setContextPath($this);
		});
	};
	
	function setContextPath($this) {
		var raw = $this[0];
		var attribute = raw.attributes.src || raw.attributes.action || raw.attributes.href;
		var type = attribute.name;
		var oldPath = attribute.value;
		
		if (oldPath.startsWith(CONTEXT_PATH)) {
			return;
		}
		
		$this.attr(type, getPath(oldPath));
	}
	
	function getPath(oldPath) {
		var withContextPath = CONTEXT_PATH + oldPath;
		return withContextPath.replace(/\/\//g, '/');
	}
	
	$.fn.contextUrl = function() {
		this.each(function(index, value) {
			setContextPath($(this));
		});
	};
})(jQuery);