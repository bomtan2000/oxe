#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

#Stage 1: Define base image that will be used for production
FROM mcr.microsoft.com/dotnet/aspnet:3.1 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

#Stage 2: Build and publish the code
FROM mcr.microsoft.com/dotnet/sdk:3.1 AS build
WORKDIR /src
COPY ["API.Authentication/API.Authentication.csproj", "API.Authentication/"]
COPY ["Data.Authentication/Data.Authentication.EFCore.csproj", "Data.Authentication/"]
COPY ["Service.Core/Service.Core.csproj", "Service.Core/"]
COPY ["Service.Authentication/Service.Authentication.csproj", "Service.Authentication/"]
COPY ["Common.TransferObject/Common.TransferObject.csproj", "Common.TransferObject/"]
RUN dotnet restore "API.Authentication/API.Authentication.csproj"
COPY . .
WORKDIR "/src/API.Authentication"
RUN dotnet build "API.Authentication.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "API.Authentication.csproj" -c Release -o /app/publish

#Stage 3: Build and publish the code
FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "API.Authentication.dll"]