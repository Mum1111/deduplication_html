import axios from "axios";
import NProgress from "nprogress";

axios.defaults.timeout = 100000;
axios.defaults.baseURL = "";

/**
 * http 请求拦截器
 */
axios.interceptors.request.use(
  (config) => {
    NProgress.start();
    config.data = JSON.stringify(config.data);
    config.headers = {
      "Content-Type": "application/json",
    };
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * http 响应拦截器
 */

axios.interceptors.response.use(
  (response) => {
    if (response.data.errCode === 2) {
      console.log("过期");
    }
    NProgress.done();
    return response;
  },
  (error) => {
    console.log("请求出错", error);
  }
);

/**
 * 封装get请求
 * @param url 请求url
 * @param params 请求参数
 * @returns {Promise}
 */
function get(url, params = {}) {
  return new Promise((resolve, reject) => {
    axios
      .get(url, { params: params })
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */
function post(url, data) {
  return new Promise((reslove, reject) => {
    axios.post(url, data).then(
      (response) => {
        reslove(response.data);
      },
      (error) => {
        reject(error);
      }
    );
  });
}

function deletes(url, data) {
  return new Promise((resolve, reject) => {
    axios.delete(url, data).then(
      (res) => {
        resolve(res.data);
      },
      (error) => {
        reject(error);
      }
    );
  });
}

export { get, post, deletes };
