
function getAPI(cmd, params, success_handler, error_handler) {
    var url = '/_/api/' + cmd;
    params['_'] = Math.random();
    $.getJSON(url, params, function (data) {
        if (data.status == 'error') {
            if (error_handler) {
                error_handler(data);
            } else {
                alert(data.message);
            }
        } else {
            if (success_handler) {
                success_handler(data);
            }
        }
    }).fail(function () {
        alert('调用失败');
    });
}


function postAPI(cmd, params, success_handler, error_handler) {
    var url = '/_/api/' + cmd;
    $.post(url, params, function (data) {
        if (data.status == 'error') {
            if (error_handler) {
                error_handler(data);
            } else {
                alert(data.message);
            }
        } else {
            if (success_handler) {
                success_handler(data);
            }
        }
    }, 'json').fail(function () {
        alert('调用失败');
    });
}


var API = {
    project: {
        list: function(successHandler, errorHandler) {
            getAPI('project/list', {}, successHandler, errorHandler);
        },
        add: function(projectPath, successHandler, errorHandler) {
            getAPI('project/add', {path:projectPath}, successHandler, errorHandler);
        },
        remove: function(projectPath, successHandler, errorHandler) {
            getAPI('project/remove', {path:projectPath}, successHandler, errorHandler);
        },
        update: function(project, successHandler, errorHandler) {
            var projectData = project.export();
            postAPI('project/update', {project: JSON.stringify(projectData)}, successHandler, errorHandler);
        }
    },

    os: {
        listDir: function(path, successHandler, errorHandler) {
            getAPI('os/listDir', {path: path}, successHandler, errorHandler);
        },
        writeFile: function(path, content, successHandler, errorHandler) {
            postAPI('os/writeFile', {path: path, content:content}, successHandler, errorHandler)
        },
        localHosts: function(successHandler, errorHandler) {
            getAPI('os/localHosts', {}, successHandler, errorHandler);
        }
    }
};