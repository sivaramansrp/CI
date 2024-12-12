#FROM nginx
#COPY dist/vucem-3.0-frontend/browser /usr/share/nginx/html

# Usa la imagen base oficial de Nginx
FROM nginx:alpine

# Elimina la configuración predeterminada de Nginx
RUN rm /etc/nginx/conf.d/default.conf

# Copia tu archivo de configuración personalizado
COPY fix.conf /etc/nginx/conf.d/

# Copia los archivos de la aplicación Angular al directorio que Nginx usa para servir contenido
COPY dist/vucem-3.0-frontend/browser /usr/share/nginx/html

# Exponer el puerto 80 para acceder a la aplicación
EXPOSE 80

# Comando por defecto para iniciar Nginx
CMD ["nginx", "-g", "daemon off;"]

