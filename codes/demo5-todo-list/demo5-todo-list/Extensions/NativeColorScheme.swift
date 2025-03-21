//
//  NativeColorScheme.swift
//  demo5-todo-list
//
//  Created by arno_solo on 3/21/25.
//


import SwiftUI

extension Color {
    static let theme = NativeColorScheme()
}

struct NativeColorScheme {
    let accent = Color("AccentColor")
    let background = Color("BackgroundColor")
    let divider = Color("DividerColor")
    let failed = Color("FailedColor")
    let onPrimary = Color("OnPrimaryColor")
    let onSurface = Color("OnSurfaceColor")
    let primary = Color("MyPrimaryColor")
    let secondaryText = Color("SecondaryTextColor")
    let success = Color("SuccessColor")
    let surface = Color("SurfaceColor")
    let text = Color("TextColor")
    let inputBg = Color("InputBgColor")
    let inputPlaceholder = Color("InputPlaceholderColor")
    let like = Color("LikeColor")
    let onSuccess = Color("OnSuccessColor")
    let crown = Color("CrownColor")
    let angry = Color("AngryColor")
    let happy = Color("HappyColor")
    let neutral = Color("NeutralColor")
    let sad = Color("SadColor")
}