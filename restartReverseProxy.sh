cd openresty
sudo /usr/local/openresty/nginx/sbin/nginx -p `pwd`/ -s stop
sudo /usr/local/openresty/nginx/sbin/nginx -p `pwd`/ -c conf/pocollab

