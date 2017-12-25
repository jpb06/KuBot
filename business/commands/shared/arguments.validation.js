let unit = module.exports = {
    "checkWatchArgs": (args) => {
        let errors = '';
        let validatedArgs = {};

        if (args.length === 0) {
            errors = 'Expecting at least one argument (comments is optional)';
        } else {
            validatedArgs.player = args[0];
            let comments = args.splice(1).join(' ');

            let quotedMatches = comments.match(/^('|"){1}[^]+\1{1}$/g);

            if (!quotedMatches) {
                validatedArgs.comment = null;
            } else if (quotedMatches.length > 1) {
                errors += '\nExpecting only one quoted string as comment\n';
            } else {
                validatedArgs.comment = quotedMatches[0].slice(1, -1);
            }
        }

        return { errors: errors, args: validatedArgs };
    },
    "checkShowArgs": (parameter) => {
        let errors = '';
        let expectedParameter = ['players', 'p'];

        if (parameter.length === 0)
            errors += 'Expecting at least one argument\n';
        if (!expectedParameter.includes(parameter))
            errors += 'Incorrect parameter\n';

        return errors;
    }
}