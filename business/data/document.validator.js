let unit = module.exports = {
    /* ---------------------------------------------------------------------------------------------------------------
        Generic
       ---------------------------------------------------------------------------------------------------------------*/
    "validateString": (name, value) => {
        if (!value)
            return name + ' is not defined';
        if (typeof value !== 'string')
            return name + ' is not a string';
        if (value.length === 0)
            return name + ' is empty';

        return null;
    },
    "validateArray": (name, value) => {
        if (!value)
            return name + ' is not defined';
        if (!value.constructor === Array)
            return name + ' is not an array';
        if (value.length === 0)
            return name + ' is empty';

        return null;
    },
    /* ---------------------------------------------------------------------------------------------------------------
        Objects
       ---------------------------------------------------------------------------------------------------------------*/
    "verifyFaction": (faction) => {
        if (!faction)
            return 'faction is not defined';

        let errors = [];
        errors.push(unit.validateString('name', faction.name));
        errors.push(unit.validateArray('tags', faction.tags));

        return errors.filter(el => el).join('\n\t');
    },
    "verifyRegion": (region) => {
        if (!region)
            return 'region is not defined';

        let errors = [];
        errors.push(unit.validateString('name', region.name));
        errors.push(unit.validateArray('systems', region.systems));

        return errors.filter(el => el).join('\n\t');
    },
    "verifyGuildSettings": (guildSettings) => {
        if (!guildSettings)
            return 'guildSettings is not defined';

        let errors = [];
        errors.push(unit.validateString('messagesImage', guildSettings.messagesImage));
        errors.push(unit.validateString('messagesFooterName', guildSettings.messagesFooterName));
        errors.push(unit.validateString('scanMainRegionName', guildSettings.scanMainRegionName));
        errors.push(unit.validateString('acknowledged', guildSettings.acknowledged));
        errors.push(unit.validateString('mainChannel', guildSettings.mainChannel));
        errors.push(unit.validateString('adminChannel', guildSettings.adminChannel));

        let desc = errors.filter(el => el).join('\n\t');
        if (desc.length > 0) desc = '- **Guild Settings (guildSettings) : **\n\t' + desc;

        return desc;
    },
    /* ---------------------------------------------------------------------------------------------------------------
        JSON documents
       ---------------------------------------------------------------------------------------------------------------*/
    "verifyGuildConfig": (json) => {
        let errors = [];

        let factionsValidation = unit.validateArray('factions', json.factions);
        if (factionsValidation) {
            errors.push(factionsValidation);
        } else {
            json.factions.forEach((faction, index) => {
                let elementValidation = unit.verifyFaction(faction);
                if (elementValidation)
                    errors.push(`- **Faction ${index + 1}**:\n\t` + elementValidation);
            });
        }

        let regionsValidation = unit.validateArray('regions', json.regions);
        if (regionsValidation) {
            errors.push(regionsValidation);
        } else {
            json.regions.forEach((region, index) => {
                let elementValidation = unit.verifyRegion(region);
                if (elementValidation)
                    errors.push(`- **Region ${index + 1}**:\n\t` + elementValidation);
            });
        }

        errors.push(unit.verifyGuildSettings(json.guildSettings));

        return errors.filter(el => el).join('\n');
    },
}