(function($, undefined) {
	$.initContextUrl = function() {
		if ( CONTEXT_PATH == null || CONTEXT_PATH === "" ) {
			throw "CONTEXT_PATH가 필요합니다";
		} else if ( CONTEXT_PATH === "/" ) {
			return;
		}
		
		$("body [href], body [src], body [action]").each(function(index, value) {
			var $this = $(this);
			setContextPath($this);
		});
	};
	
	$.fn.contextUrl = function() {
		this.each(function(index, value) {
			$(this).find("[href], [src], [action]").each(function() {
				setContextPath($(this));
			});
			
			setContextPath($(this));
		});
	};
	
	function setContextPath($this) {
		var raw = $this[0],
			attribute = raw.attributes.src || raw.attributes.action || raw.attributes.href,
			type = attribute == null ? null : attribute.name,
			oldPath = attribute == null ? null : attribute.value;
		
		if ( attribute == null || oldPath.startsWith('http://') || oldPath.startsWith('https://') || oldPath.startsWith(CONTEXT_PATH) ) {
			return;
		}
		
		$this.attr(type, getPath(oldPath));
	}
	
	function getPath(oldPath) {
		var withContextPath = CONTEXT_PATH + oldPath;
		return withContextPath.replace(/\/\//g, '/');
	}
})(jQuery);