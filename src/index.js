function importAll(r) {
  r.keys().forEach(r);
}
importAll(require.context('./', true, /\.(js|scss|png|svg|eot|ttf|woff)$/));
