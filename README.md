# External POST Explorer

An Azure functions app that uses External POST to transfer data to B-Com.

	az group create --name externalPostExplorerGroup --location westeurope
	az storage account create --name externalpostexplorer --location westeurope --resource-group externalPostExplorerGroup --sku Standard_LRS
	az functionapp create --name ExternalPostExplorer --storage-account externalpostexplorer --resource-group externalPostExplorerGroup --consumption-plan-location westeurope

Now we can upload some static content:

	az storage container create --name externalpostexplorerstatic
	az storage blob upload --container-name externalpostexplorerstatic --file clientside/index.html --name index.html --content-type "text/html"
	
