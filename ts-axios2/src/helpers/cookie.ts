const cookie = {
  read(name: string): string | null {
    const match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'))
    console.log('document.cookie', document.cookie)
    return match ? decodeURIComponent(match[3]) : null
  }
}
export default cookie