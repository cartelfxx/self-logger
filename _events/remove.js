const config = require('../config.json');
const genders = require('../structure/Genders.json');

const ayrilanlar = new Set();

function control(isim) {
    const name = isim.toLowerCase().trim();
    return genders.Names.some(item => 
        item.name.toLowerCase() === name && item.sex === 'K'
    );
}

module.exports = {
    execute: async (client, member) => {
        const key = `${member.guild.id}-${member.id}`;
        
        if (ayrilanlar.has(key)) return;
        
        ayrilanlar.add(key);
        
        const isim = member.displayName || member.user.username;
        
        if (!control(isim)) return;
        
        const channel = client.channels.cache.get(config.log);
        if (!channel) return;
        
        const embed = {
            color: 0xff6b6b,
            title: 'Sunucudan Ayrıldı',
            fields: [
                {
                    name: 'Kullanıcı',
                    value: `${member.user.tag} (${isim})`,
                    inline: true
                },
                {
                    name: 'ID',
                    value: member.id,
                    inline: true
                },
                {
                    name: 'Sunucu Adı',
                    value: member.guild.name,
                    inline: true
                }
            ],
            thumbnail: {
                url: member.user.displayAvatarURL({ dynamic: true })
            },
            footer: {
                text: `Sunucu ID: ${member.guild.id}`
            }
        };
        
        await channel.send({ embeds: [embed] });
    }
};
