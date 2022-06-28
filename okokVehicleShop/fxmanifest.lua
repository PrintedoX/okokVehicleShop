fx_version 'cerulean'

game 'gta5'

author 'okok#3488'
description 'okokVehicleShop'

ui_page 'web/ui.html'

files {
	'web/*.*',
	'web/img/*.png'
}

shared_script 'config.lua'

client_scripts {
	'client.lua'
}

server_scripts {
	'@mysql-async/lib/MySQL.lua',
	'webhook.lua',
	'server.lua'
}

lua54 'yes'

escrow_ignore {
	'config.lua',
	'webhook.lua'
}